import admin  from "firebase-admin";
import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const serviceAccout =require('../firebase/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccout), // or use serviceAccountKey.json
});

export default admin;