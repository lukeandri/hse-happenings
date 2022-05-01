//imports all other files we use in the code
//used prettier download on VS code for the entire thing for correct formatting
import "./App.css";
import React from "react";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/homePage";
import { Authprovider } from "./components/contexts/AuthContext";
import Login from "./components/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    //routers were a tough part to figure out since there was so many ways to do things
    //and a lot of specific things that had to be correct for it to work.
    <Authprovider>
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                {/* this allows there to be those links at the top of the page. */}
                <Link to="/signUp">Sign up </Link>
                <Link to="/HomePage">Home Page </Link>
                <Link to="/login">Login </Link>
                <Routes>
                  <Route
                  // this is where we use private route, to make sure they go to the homepage after authentication.
                    path="/HomePage"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route exact path="/login" element={<Login />}>
                    {" "}
                  </Route>
                  <Route exact path="/signUp" element={<Signup />}></Route>
                </Routes>
              </li>
            </ul>
          </div>
        </Router>
      </div>
    </Authprovider>
  );
}
export default App;
