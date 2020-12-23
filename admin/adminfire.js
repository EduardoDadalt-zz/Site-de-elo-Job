var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://galaxyjobwebsiteelojob.firebaseio.com",
    })
  : admin.app();

export const admindatabase = admin.database();
export default admin;
