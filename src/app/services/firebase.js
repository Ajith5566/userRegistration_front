import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCuUGwrWcegtYu9sMXiQdpHCst9CMHXB-M",
    authDomain: "userregistration-70add.firebaseapp.com",
    projectId: "userregistration-70add",
    storageBucket: "userregistration-70add.appspot.com",
    messagingSenderId: "789153426994",
    appId: "1:789153426994:web:3104e0f2584859a9e7562b",
    measurementId: "G-V32MGEJ0NE"
  };
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);