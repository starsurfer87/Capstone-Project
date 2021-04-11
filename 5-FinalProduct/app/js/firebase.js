
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBaaKZnx0pYh8BvuJuC4sfG8B08212xs6w",
      authDomain: "spark-streaks.firebaseapp.com",
      projectId: "spark-streaks",
      storageBucket: "spark-streaks.appspot.com",
      messagingSenderId: "726092113455",
      appId: "1:726092113455:web:66b34ffab25c59eeacc8da",
      measurementId: "G-VG0P5ZLYEW"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const db = firebase.firestore();
    const timeNow = firebase.firestore.Timestamp.now();
    console.log(" ### timestamp now from firestore: " + timeNow);
