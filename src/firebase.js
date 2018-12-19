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
//https://github.com/coderjourney/chords/pull/7/commits/f9895120061fbdc3c2b1b3182bc910ac4050e411

//https://css-tricks.com/firebase-react-part-2-user-authentication/
//https://serverless-stack.com/chapters/create-a-login-page.html
//https://alligator.io/react/fancy-forms-reactstrap/