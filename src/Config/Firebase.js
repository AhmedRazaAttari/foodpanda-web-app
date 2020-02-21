import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUSKmnQ3luNZg3lK1T38z8qQfTqI35P-Y",
    authDomain: "foodpanda-app.firebaseapp.com",
    databaseURL: "https://foodpanda-app.firebaseio.com",
    projectId: "foodpanda-app",
    storageBucket: "foodpanda-app.appspot.com",
    messagingSenderId: "120707439234",
    appId: "1:120707439234:web:23fe732e86cfa0dc"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;