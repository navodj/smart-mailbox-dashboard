// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCjW3zaWC1LRp1ZHcZZ5dJz75A1VZtgzuk",
    authDomain: "smartpostbox-c4221.firebaseapp.com",
    databaseURL: "https://smartpostbox-c4221-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartpostbox-c4221",
    storageBucket: "smartpostbox-c4221.firebasestorage.app",
    messagingSenderId: "166198282053",
    appId: "1:166198282053:web:899b98420ef18b1fcba02c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Firebase services
const googleProvider = new firebase.auth.GoogleAuthProvider();