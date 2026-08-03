import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, X, MessageCircle, Send, Square, Pen, MousePointer, StopCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

export function ScreenShareModal({ assetId, assetName, onClose }) {
  const [session, setSession] = useState(null);
  const [viewers, setViewers] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { user } = useAuthStore();
  
  const socketRef = useRef(null);
  const videoRef = useRef(null);
  const peerConnections = useRef({});

  useEffect(() => {
    startSharing();
    return () => stopSharing();
  }, []);

  const startSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsSharing(true);

      const base = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081';
      const socket = io(base);
      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('screen-share:start', { assetId, assetName });
      });

      socket.on('screen-share:created', ({ sessionId }) => {
        setSession({ id: sessionId });
        toast.success('Session de partage démarrée !');
      });

      socket.on('screen-share:viewer-joined', ({ viewerInfo }) => {
        setViewers(prev => [...prev, viewerInfo]);
        toast(`${viewerInfo.firstName} a rejoint la session`);
        // Create peer connection for this viewer
        createPeerConnection(stream, viewerInfo.socketId, socket);
      });

      socket.on('screen-share:signal', async ({ from, signal }) => {
        const pc = peerConnections.current[from];
        if (!pc) return;
        if (signal.candidate) await pc.addIceCandidate(signal).catch(() => {});
        else if (signal.type === 'answer') await pc.setRemoteDescription(signal).catch(() => {});
      });

      socket.on('screen-share:chat', msg => {
        setChat(prev => [...prev, msg]);
      });

      socket.on('screen-share:ended', () => {
        toast.info('Session terminée');
        onClose();
      });

      stream.getVideoTracks()[0].onended = () => stopSharing();
    } catch (err) {
      toast.error('Partage d\'écran refusé ou non disponible');
      onClose();
    }
  };

  const createPeerConnection = async (stream, viewerSocketId, socket) => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    peerConnections.current[viewerSocketId] = pc;
    stream.getTracks().forEach(t => pc.addTrack(t, stream));
    pc.onicecandidate = e => {
      if (e.candidate) socket.emit('screen-share:signal', { to: viewerSocketId, signal: e.candidate, sessionId: session?.id });
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('screen-share:signal', { to: viewerSocketId, signal: offer, sessionId: session?.id });
  };

  const stopSharing = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    Object.values(peerConnections.current).forEach(pc => pc.close());
    if (session) socketRef.current?.emit('screen-share:end', { sessionId: session.id });
    socketRef.current?.disconnect();
    setIsSharing(false);
  };

  const sendChat = () => {
    if (!chatInput.trim() || !session) return;
    socketRef.current?.emit('screen-share:chat', { sessionId: session.id, message: chatInput });
    setChat(prev => [...prev, { message: chatInput, userInfo: user, timestamp: Date.now() }]);
    setChatInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col"
        style={{ height: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isSharing ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
            <Monitor className="w-5 h-5 text-slate-300" />
            <span className="text-white font-medium">Partage d'écran — {assetName}</span>
            {session && (
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                Session #{session.id}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{viewers.length} spectateur(s)</span>
            <button
              onClick={stopSharing}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
            >
              <StopCircle className="w-3 h-3" />
              Arrêter
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Video area */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="max-w-full max-h-full object-contain"
            />
            {!isSharing && (
              <div className="text-slate-400 flex flex-col items-center gap-3">
                <Monitor className="w-12 h-12" />
                <p>Démarrage du partage...</p>
              </div>
            )}
            {viewers.length === 0 && isSharing && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full">
                En attente de participants...
              </div>
            )}
          </div>

          {/* Chat sidebar */}
          <div className="w-72 bg-slate-800 flex flex-col border-l border-slate-700">
            <div className="p-3 border-b border-slate-700 text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MessageCircle className="w-3 h-3" />
              Chat de session
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chat.map((msg, i) => (
                <div key={i} className="text-sm">
                  <span className="text-orange-400 font-medium">{msg.userInfo?.firstName || 'Vous'}: </span>
                  <span className="text-slate-300">{msg.message}</span>
                </div>
              ))}
              {chat.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-4">Aucun message</p>
              )}
            </div>
            <div className="p-3 border-t border-slate-700 flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Message..."
                className="flex-1 bg-slate-700 text-white text-sm px-3 py-2 rounded-lg border border-slate-600 outline-none focus:border-orange-400"
              />
              <button onClick={sendChat} className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScreenShareButton({ assetId, assetName }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors"
      >
        <Monitor className="w-4 h-4" />
        Partager l'écran
      </button>
      <AnimatePresence>
        {isOpen && (
          <ScreenShareModal assetId={assetId} assetName={assetName} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
