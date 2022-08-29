// let firebase = require('firebase');
// let firebaseui = require('firebaseui');
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

alert('Hello World!');

// watching this video: https://youtu.be/rQvOAnNvcNQ?t=410
// Follow up with this video: https://youtu.be/rbuSx1yEgV8

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDGt9-p4cd3oZqRadPSMhDQtTvLHaa8FV0",
  authDomain: "pocket-money-watch.firebaseapp.com",
  projectId: "pocket-money-watch",
  storageBucket: "pocket-money-watch.appspot.com",
  messagingSenderId: "794518607156",
  appId: "1:794518607156:web:5a1406eef0c4e626e3c161",
  measurementId: "G-8YFG5152S1"
});

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('Logged in...');
  } else {
    console.log('No user logged in');
  }
});
