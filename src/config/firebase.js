import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyARbVGlGg6zTLO_PT3UVi7ewBa_Nk6RBJo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sajag-86f64.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sajag-86f64",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sajag-86f64.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "581704512722",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:581704512722:web:6a2fdc327f5b301a2aa90b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-L1BB6QW06W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, EmailAuthProvider };
export default app;
