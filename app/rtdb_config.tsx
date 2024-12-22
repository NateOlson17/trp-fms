import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAYpxxX7Hl2xyu2pd_CXlm-GeveD1TWvnA",
    authDomain: "trp-fms.firebaseapp.com",
    databaseURL: "https://trp-fms-default-rtdb.firebaseio.com",
    projectId: "trp-fms",
    storageBucket: "trp-fms.firebasestorage.app",
    messagingSenderId: "960813890282",
    appId: "1:960813890282:web:14a8cb7f13c56c2f9ef593",
    measurementId: "G-PMFM3ZQ352"
  };

  const app = initializeApp(firebaseConfig);
  export const rtdb = getDatabase(app);