// This script is for one-time use to set the first admin.

// Get the email from command-line arguments
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address as an argument.');
  process.exit(1);
}

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Set the custom claim
async function setAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Success! ${email} has been made an admin.`);
    process.exit(0);
  } catch (error) {
    console.error('Error setting custom claim:', error.message);
    process.exit(1);
  }
}

setAdminClaim();
