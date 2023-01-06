
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDe_jJwgAnEXBl2fZnveh79WFc7hgIOCuY",
    authDomain: "huargos-b89e0.firebaseapp.com",
    projectId: "huargos-b89e0",
    storageBucket: "huargos-b89e0.appspot.com",
    messagingSenderId: "421728621367",
    appId: "1:421728621367:web:8c95f0440e865a660640b2"
  };


  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const auth = getAuth(app);
