import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRrdaGNPQhRuioxQZqb79TGIjqfIpUOVk",
  authDomain: "galaxyjobwebsiteelojob.firebaseapp.com",
  databaseURL: "https://galaxyjobwebsiteelojob.firebaseio.com",
  projectId: "galaxyjobwebsiteelojob",
  storageBucket: "galaxyjobwebsiteelojob.appspot.com",
  messagingSenderId: "321519598693",
  appId: "1:321519598693:web:dffafae52807be657e1a8c",
  measurementId: "G-M36X7CJBTX",
};

const fire = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default fire;