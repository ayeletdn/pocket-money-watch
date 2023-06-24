import {initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDGt9-p4cd3oZqRadPSMhDQtTvLHaa8FV0',
  authDomain: 'pocket-money-watch.firebaseapp.com',
  projectId: 'pocket-money-watch',
  storageBucket: 'pocket-money-watch.appspot.com',
  messagingSenderId: '794518607156',
  appId: '1:794518607156:web:5a1406eef0c4e626e3c161',
  measurementId: 'G-8YFG5152S1',
};

// firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = firebase.auth();
export const app = initializeApp(firebaseConfig);
