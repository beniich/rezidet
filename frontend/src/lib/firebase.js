import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

// ─── Firebase Config (project: tonal-legacy-v07pf) ───────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tonal-legacy-v07pf.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tonal-legacy-v07pf',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tonal-legacy-v07pf.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1037154403107',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1037154403107:web:2984f2dfd3b53580f24296',
};

// Singleton: éviter double-initialisation en HMR
export const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// ─── Google Provider ──────────────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ─── Auth Functions ───────────────────────────────────────────────────────────

/**
 * Sign in via Google OAuth popup
 * Returns idToken for backend verification
 */
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  const idToken = await result.user.getIdToken();
  return { user: result.user, idToken };
};

/**
 * Register with email/password via Firebase
 */
export const registerWithEmailFirebase = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  const idToken = await user.getIdToken();
  return { user, idToken };
};

/**
 * Login with email/password via Firebase
 */
export const loginWithEmailFirebase = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const idToken = await user.getIdToken();
  return { user, idToken };
};

/**
 * Sign out from Firebase
 */
export const firebaseSignOut = () => signOut(firebaseAuth);

/**
 * Listen to auth state changes
 */
export const onFirebaseAuthStateChanged = (callback) => {
  return onAuthStateChanged(firebaseAuth, callback);
};

/**
 * Get current Firebase user ID token (refresh if needed)
 */
export const getCurrentIdToken = async () => {
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  return user.getIdToken(true); // true = force refresh
};
