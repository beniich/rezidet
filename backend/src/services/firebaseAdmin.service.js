const admin = require('firebase-admin');
const fs = require('fs');

let initialized = false;

/**
 * Initialise Firebase Admin avec de vrais credentials
 * REFUSE de tourner en mode "mock" en production
 */
function initializeFirebaseAdmin() {
  if (initialized) return admin;

  let serviceAccount;

  // ============== PRODUCTION: REFUSE MOCK ==============
  if (process.env.NODE_ENV === 'production') {
    // Option 1: Fichier JSON
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
      
      if (!fs.existsSync(path)) {
        throw new Error(
          `❌ PRODUCTION: Fichier Firebase credentials introuvable: ${path}\n` +
          `Veuillez uploader votre service-account.json et configurer FIREBASE_SERVICE_ACCOUNT_PATH`
        );
      }
      
      try {
        serviceAccount = JSON.parse(fs.readFileSync(path, 'utf8'));
        console.log('✅ Firebase credentials chargées depuis:', path);
      } catch (err) {
        throw new Error(`❌ Fichier Firebase credentials invalide: ${err.message}`);
      }
    }
    // Option 2: JSON inline
    else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        console.log('✅ Firebase credentials chargées depuis variable env');
      } catch (err) {
        throw new Error(`❌ FIREBASE_SERVICE_ACCOUNT_JSON invalide: ${err.message}`);
      }
    }
    // Aucun credentials en production
    else {
      throw new Error(
        '❌ PRODUCTION: Firebase credentials manquantes!\n' +
        'Configurez FIREBASE_SERVICE_ACCOUNT_PATH ou FIREBASE_SERVICE_ACCOUNT_JSON dans .env.production'
      );
    }

    // Validation basique
    if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
      throw new Error('❌ Service account JSON invalide (champs manquants)');
    }
  }
  // ============== DEV: TOLÈRE MOCK ==============
  else {
    // Dev sans credentials → mock pour permettre le boot
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH && fs.existsSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)) {
      serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'));
    } else {
      console.warn('⚠️  DEV MODE: Firebase Admin non initialisé (mock)');
      // Mock admin (uniquement pour dev)
      admin.initializeApp({ projectId: 'mock-dev' });
      initialized = true;
      return admin;
    }
  }

  // Initialiser Firebase
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    initialized = true;
    console.log(`✅ Firebase Admin initialisé (project: ${serviceAccount.project_id})`);
    return admin;
  } catch (err) {
    throw new Error(`❌ Erreur initialisation Firebase: ${err.message}`);
  }
}

// Initialiser au chargement du module
try {
  initializeFirebaseAdmin();
} catch (err) {
  console.error(err.message);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

module.exports = admin;
