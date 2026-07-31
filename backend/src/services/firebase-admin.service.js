const admin = require('firebase-admin');

let app;

/**
 * Initialise Firebase Admin SDK (singleton)
 * Supporte : GOOGLE_APPLICATION_CREDENTIALS (fichier) OU variables d'env individuelles
 */
const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  const projectId = process.env.FIREBASE_PROJECT_ID || 'tonal-legacy-v07pf';

  // Mode 1 : fichier service account (prod recommandée)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId
    });
    console.log('🔥 Firebase Admin: applicationDefault credentials');
    return app;
  }

  // Mode 2 : variables d'env individuelles
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      projectId
    });
    console.log('🔥 Firebase Admin: cert credentials');
    return app;
  }

  // Mode 3 : dev sans credentials (vérification simulée)
  console.warn('⚠️ Firebase Admin: no credentials found — mock mode (dev only)');
  return null;
};

const firebaseAdmin = initFirebaseAdmin();

/**
 * Vérifie un idToken Firebase et retourne les claims décodés
 * @param {string} idToken - Token envoyé par le frontend
 * @returns {Promise<admin.auth.DecodedIdToken>}
 */
const verifyFirebaseToken = async (idToken) => {
  if (!firebaseAdmin) {
    // Mock pour dev local sans credentials
    console.warn('⚠️ Firebase Admin mock verify — NE PAS utiliser en prod');
    const [, payload] = idToken.split('.');
    if (!payload) throw new Error('Token invalide');
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    return decoded;
  }

  return admin.auth().verifyIdToken(idToken);
};

module.exports = { verifyFirebaseToken, firebaseAdmin };
