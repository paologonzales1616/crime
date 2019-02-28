import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyADMg6OCHwf6ZC8QaMtpCb-nddpnSleJx8",
    authDomain: "crime-fd040.firebaseapp.com",
    databaseURL: "https://crime-fd040.firebaseio.com",
    projectId: "crime-fd040",
    storageBucket: "crime-fd040.appspot.com",
    messagingSenderId: "123884288015"
};
const fire = firebase.initializeApp(config)
export default fire
