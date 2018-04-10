import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDWlq5Mryh67GWFvE-AFAnn4rgb_2qLmf4",
  authDomain: "catch-of-the-day-tcos.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tcos.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
