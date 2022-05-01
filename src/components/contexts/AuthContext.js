//this is where we create the users and talk to firebase pretty much. Firebase
//save the users and make sure they are stored.
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import Signup from "../Signup";
import uuid from "react-uuid";
import { getDatabase, ref, child, get, set } from "firebase/database";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
// this we use to talk to firebase to get recent events so they dont disapeer
// on the page when you refresh. They are stored in a date base on Firebase
// in the file we upload to github we will add pictures to what we see in the
// data base of firebase.
export async function getRecentEvents() {
  const dbRef = ref(getDatabase());
  let results = [];
  await get(child(dbRef, `events/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let tasks = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          console.log("value" + JSON.stringify(value));
          tasks.push(value.task);
        }
        results = tasks;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return results;
}
//this is the function that allows us to write those events out so they dont disapeer
//each event gets a specific uuid so then we are able to see it as that
//uuid in firebase instead of just "null " or "empty"
export function writeEvent(task) {
  const db = getDatabase();
  set(ref(db, "events/" + uuid()), {
    task: task,
  });
}
//this is what lets us sign up through firebase and beable to have authentication
//auth is from firebase and this is from the firebase tutorials
export function Authprovider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    }, []);
    return unsubscribe;
  });
  const value = {
    currentUser,
    login,
    signup,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
