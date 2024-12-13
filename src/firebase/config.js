import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPtyMeZbrIHkN8e6Emfnk21dHWFHFUoxM",
  authDomain: "socialmediaapp-ed421.firebaseapp.com",
  projectId: "socialmediaapp-ed421",
  storageBucket: "socialmediaapp-ed421.firebasestorage.app",
  messagingSenderId: "704238352470",
  appId: "1:704238352470:web:27c34ecb394130ba3823f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 