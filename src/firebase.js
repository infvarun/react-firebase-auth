import firebase from  'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBA0VeFlwjFamjicKy3mraAB90AOjG-z-A",
    authDomain: "thezeroone-blog.firebaseapp.com",
    databaseURL: "https://thezeroone-blog-default-rtdb.firebaseio.com",
    projectId: "thezeroone-blog",
    storageBucket: "thezeroone-blog.appspot.com",
    messagingSenderId: "530592984023",
    appId: "1:530592984023:web:fe6b398b0ebdf20f85f992",
    measurementId: "G-PRMF5109V8"
  };

  /**
   * Create new user in firestore
   */
  export const createUserProfileDocument = async (userAuth, additionalData) => {
     if(!userAuth) return null;

     const userRef = firestore.doc(`users/${userAuth.uid}`);

     const snapShot = await userRef.get();

     console.log(snapShot);

     if(!snapShot.exists) {
       const {displayName, email} = userAuth;
       const createdAt = new Date();

       try{
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         });

       } catch(err) {
        console.log("Error creating user!!", err.message);
       }
     }

     return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters( { prompt: 'select_account' } );

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;