import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

//this is used in App.js so we cant get to the home page without first having to
//log in or sign up
//if it is authorized then they can
//but on line 12 we tell it if they arent a curent user then they are pushed to
//the login page
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log("printing" + currentUser);
  return currentUser ? children : <Navigate to="/login" />;
}
