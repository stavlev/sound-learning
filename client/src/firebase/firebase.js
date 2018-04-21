import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhAzP-dXvSxbvZsj-gRMZ0eLoyoOS6-9o",
    authDomain: "musiclingo-8a4a1.firebaseapp.com",
    databaseURL: "https://musiclingo-8a4a1.firebaseio.com",
    projectId: "musiclingo-8a4a1",
    storageBucket: "musiclingo-8a4a1.appspot.com",
    messagingSenderId: "84208794413"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
    db,
    auth,
};