import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyB1IbQ5S9pKxFBX2afRpUYXiJlE9jzf-Bw",
    authDomain: "crime-e40c1.firebaseapp.com",
    databaseURL: "https://crime-e40c1.firebaseio.com",
    projectId: "crime-e40c1",
    storageBucket: "",
    messagingSenderId: "778098789673",
    appId: "1:778098789673:web:ac39e117b39efd42dc3b38"
};
const fire = firebase.initializeApp(config)
export default fire
