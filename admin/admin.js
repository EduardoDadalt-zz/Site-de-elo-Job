var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

const FBAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://galaxyjobwebsiteelojob.firebaseio.com",
    })
  : admin.app();

export const databaseAdmin = admin.database();
export default FBAdmin;
