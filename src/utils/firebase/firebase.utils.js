import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWhHc0mJ842kfxMhYv6PMKCc12A7abdoY",
    authDomain: "crwn-clothing-db-97847.firebaseapp.com",
    projectId: "crwn-clothing-db-97847",
    storageBucket: "crwn-clothing-db-97847.appspot.com",
    messagingSenderId: "753153599612",
    appId: "1:753153599612:web:be932a9cf837c79e15c1f9"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    console.log(userAuth);
  };
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
      }
    
      return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }