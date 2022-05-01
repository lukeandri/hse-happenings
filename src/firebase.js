import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
const REACT_APP_HAPPENING_API_KEY="AIzaSyCVa_QcbHyWUN3f4p8TgRNrwwF7PGUeC8U"
const REACT_APP_HAPPENING_AUTH_DOMAIN="hse-awareness-login.firebaseapp.com"
const REACT_APP_HAPPENING_PROJECT_ID="hse-awareness-login"
const REACT_APP_HAPPENING_STORAGE_BUCKET="hse-awareness-login.appspot.com"
const REACT_APP_HAPPENING_MESSAGING_SENDER_ID="916101091380"
const REACT_APP_HAPPENING_APP_ID="1:916101091380:web:09eaca6ae39bde9ee8ba61"
const app =firebase.initializeApp({
    apiKey: REACT_APP_HAPPENING_API_KEY,
    authDomain: REACT_APP_HAPPENING_AUTH_DOMAIN,
    projectId: REACT_APP_HAPPENING_PROJECT_ID,
    storageBucket: REACT_APP_HAPPENING_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_HAPPENING_MESSAGING_SENDER_ID,
    appId: REACT_APP_HAPPENING_APP_ID
    //add database url 
})

export const auth = app.auth()
export default app 