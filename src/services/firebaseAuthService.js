import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const token = await user.getIdToken();
  
  return {
    user: {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      role: 'ndma_admin',
    },
    token,
    provider: 'google',
  };
};

export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const token = await user.getIdToken();
  
  return {
    user: {
      id: user.uid,
      name: user.displayName || email.split('@')[0],
      email: user.email,
      role: 'ndma_admin',
    },
    token,
    provider: 'email',
  };
};

export const signUpWithEmail = async (email, password, displayName) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  
  const token = await user.getIdToken();
  
  return {
    user: {
      id: user.uid,
      name: displayName || email.split('@')[0],
      email: user.email,
      role: 'ndma_admin',
    },
    token,
    provider: 'email',
  };
};

export const firebaseSignOut = async () => {
  await signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      callback({
        user: {
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0],
          email: user.email,
          avatar: user.photoURL,
          role: 'ndma_admin',
        },
        token,
        isAuthenticated: true,
      });
    } else {
      callback({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  });
};

export const getCurrentFirebaseUser = () => {
  return auth.currentUser;
};

export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(true);
  }
  return null;
};
