process.env.TZ = 'Asia/Tokyo';

/**
 * コアモジュール
 */
const admin = require('firebase-admin');
const functions = require('firebase-functions');

import { init } from 'src/express';

functions.region('asia-northeast1');
admin.initializeApp(functions.config().firebase);

export const db = admin.firestore();

const api = functions.https.onRequest(init());
module.exports = { api };
