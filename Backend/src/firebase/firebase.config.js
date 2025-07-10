// import admin  from "firebase-admin";
// import {createRequire} from 'module'

// const require = createRequire(import.meta.url);
// const serviceAccout =require('../firebase/serviceAccountKey.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccout), // or use serviceAccountKey.json
// });

// export default admin;

import admin from "firebase-admin";
import dotenv from "dotenv"
dotenv.config();

// Get the credentials from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
