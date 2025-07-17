// Initialize Firebase
const firebaseConfig = {
    apiKey: "Your_API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DB_URL",
    projectId: "################",
    storageBucket: "#############",
    messagingSenderId: "SENDER_ID",
    appId: "APK_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Firebase services
const googleProvider = new firebase.auth.GoogleAuthProvider();
