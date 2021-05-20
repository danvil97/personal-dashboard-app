import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAE1vLuo_e6_9W4k4EY-HE_FhGlQhYJGKM',
  authDomain: 'personal-dashboard-app-41d4b.firebaseapp.com',
  projectId: 'personal-dashboard-app-41d4b',
  storageBucket: 'personal-dashboard-app-41d4b.appspot.com',
  messagingSenderId: '1021551016830',
  appId: '1:1021551016830:web:14f28e5fad998b277c912f',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { auth, provider, db };
