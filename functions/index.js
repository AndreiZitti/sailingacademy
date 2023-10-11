/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const axios = require('axios');

exports.getReviews = functions.https.onCall(async (data, context) => {
    const token = 'YOUR_ACCESS_TOKEN'; // In a real scenario, you'd handle this more securely

    try {
        const response = await axios.get('https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Failed to fetch reviews.');
    }
});