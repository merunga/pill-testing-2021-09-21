// Este es el punto de entrada de tu aplicacion
// Import the functions you need from the SDKs you need

import { renderPage } from './ui/utils.js';

export const init = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCWU4_mjldV5YcLbjkkbpTgnm-3rluUx1U',
    authDomain: 'pill-testing-1c2b0.firebaseapp.com',
    projectId: 'pill-testing-1c2b0',
    storageBucket: 'pill-testing-1c2b0.appspot.com',
    messagingSenderId: '445789302171',
    appId: '1:445789302171:web:7405ce71f6c4d7d464853e',
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  window.firebaseApp = app;

  return renderPage();
};
