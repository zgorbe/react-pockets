import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA-AQOhDuAWiD9ljbxKI1QefKVAPzyYcR0",
    authDomain: "fire-pockets.firebaseapp.com",
    databaseURL: "https://fire-pockets.firebaseio.com",
    projectId: "fire-pockets",
    storageBucket: "fire-pockets.appspot.com",
    messagingSenderId: "321796101692"    
};

const app = firebase.initializeApp(config);

export const db = app.database();
export const pockectsRef = db.ref('pockets');

export default firebase;