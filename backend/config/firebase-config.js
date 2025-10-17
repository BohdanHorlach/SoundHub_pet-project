const admin = require("firebase-admin");


const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_KEY_JSON, 'base64').toString('utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sound-hub-pet-project.firebasestorage.app'
});

const bucket = admin.storage().bucket();
module.exports = { admin, bucket };