// Import Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Import Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Config dari Firebase kamu (COPY YANG DI DALAM {} SAJA)
const firebaseConfig = {
    apiKey: "AIzaSyCsIQAATSRbKCJk_mg3xsNOJE5S37928y0",
    authDomain: "alepos-c12e1.firebaseapp.com",
    projectId: "alepos-c12e1",
    storageBucket: "alepos-c12e1.firebasestorage.app",
    messagingSenderId: "447748073970",
    appId: "1:447748073970:web:8e8144652606417592636b",
    measurementId: "G-08ZGVSGEGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };