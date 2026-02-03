// Твої актуальні дані з Firebase (image_121d77.jpg)
const firebaseConfig = {
  apiKey: "AIzaSyDyi0FYhKqSpDbkepplnE8-mSi7TzK4wH8",
  authDomain: "gta-2d-fcfd6.firebaseapp.com",
  projectId: "gta-2d-fcfd6",
  storageBucket: "gta-2d-fcfd6.firebasestorage.app",
  messagingSenderId: "774911809717",
  appId: "1:774911809717:web:a1524de63f6d00125146fc",
  measurementId: "G-HL8W9XSJ41"
};

// Ініціалізація саме для версії "compat" (яку ми підключили в HTML)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
