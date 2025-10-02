/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/https';
import * as logger from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

initializeApp();
const db = getFirestore();

// Function to grant a role using UID
export const addAdminRole = onCall({ cors: true }, async (request) => {
  // Check if the user calling the function is an admin.
  if (request.auth?.token.admin !== true) {
    throw new HttpsError('permission-denied', 'You must be an admin to perform this action.');
  }

  const { uid, role } = request.data;
  if (!uid || !role) {
    throw new HttpsError(
      'invalid-argument',
      'The function must be called with "uid" and "role" arguments.'
    );
  }

  try {
    await getAuth().setCustomUserClaims(uid, { [role]: true });
    return {
      message: `Success! Role '${role}' granted.`,
    };
  } catch (error) {
    console.error(error);
    throw new HttpsError('internal', 'An error occurred.');
  }
});

// Function to find a user by their unique username
export const findUserByUsername = onCall({ cors: true }, async (request) => {
  // Ensure the caller is an admin
  if (request.auth?.token.admin !== true) {
    throw new HttpsError('permission-denied', 'You must be an admin to perform this action.');
  }

  const username = request.data.username;
  if (typeof username !== 'string') {
    throw new HttpsError(
      'invalid-argument',
      'The function must be called with a string "username" argument.'
    );
  }

  try {
    // 1. Look up the username in the 'usernames' collection to get the UID
    const usernameDoc = await db.collection('usernames').doc(username.toLowerCase()).get();
    if (!usernameDoc.exists) {
      return null; // User not found
    }
    const { uid } = usernameDoc.data() as { uid: string };

    // 2. Use the UID to get the full user record from Firebase Auth
    const user = await getAuth().getUser(uid);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAdmin: user.customClaims?.['admin'] === true,
    };
  } catch (error) {
    console.error(error);
    throw new HttpsError('internal', 'An error occurred while fetching user data.');
  }
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
