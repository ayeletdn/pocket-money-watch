import {initializeApp} from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import { Auth, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useMemo } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDGt9-p4cd3oZqRadPSMhDQtTvLHaa8FV0',
  authDomain: 'pocket-money-watch.firebaseapp.com',
  projectId: 'pocket-money-watch',
  storageBucket: 'pocket-money-watch.appspot.com',
  messagingSenderId: '794518607156',
  appId: '1:794518607156:web:5a1406eef0c4e626e3c161',
  measurementId: 'G-8YFG5152S1',
  databaseURL: 'https://pocket-money-watch-default-rtdb.europe-west1.firebasedatabase.app',
};

let auth: Auth;

export const useFirebaseAuth = () => {
  const app = useMemo(() => initializeApp(firebaseConfig), []);
  auth = useMemo(() => getAuth(), []);

  const db = useMemo(() => getDatabase(app), [app]);
  return {auth, db};
}
