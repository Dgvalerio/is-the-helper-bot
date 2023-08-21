import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJgsYyZF6d_IsAwt-4Sz6ywhV6fPLAVY4',
  authDomain: 'is-the-helper.firebaseapp.com',
  projectId: 'is-the-helper',
  storageBucket: 'is-the-helper.appspot.com',
  messagingSenderId: '560681476710',
  appId: '1:560681476710:web:4c1ae877f433bb1f6e43a7',
  credential: cert(JSON.parse(`${process.env.CREDENTIALS}`)),
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
