import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDQkgJ2EZb7qdgCp1fhQC0TQ7DEcT6zY4U",
  authDomain: "music-9913a.firebaseapp.com",
  projectId: "music-9913a",
  storageBucket: "music-9913a.appspot.com",
  messagingSenderId: "304612671018",
  appId: "1:304612671018:web:cec60d4e4c335c6df20d53"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp)

export { db };





