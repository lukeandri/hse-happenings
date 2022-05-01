import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//had a lot of bugs cause when we followed tutorials or where learning about
//different forms of authentication they were all using v4 or v5 while currently
//we are on v6. So we had a lot of new formatting and figuring out ways to doing
//things slightly differently then they have been done by people teaching us
//about how it all works.

//we also added a picutre of the data base that lets us see all accounts that are 
//created through firebase on the github so you are able to see the database 
//behind this project.
//every time someone creates an account it is added to the database same as the events.
export default function Login() {
  //these refs allow us to check to see if they are a user or not
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //this was our first way to make sure that they didnt already have an account
  //and it let us make sure nothing was wrong essentially while we were trying to
  //have a user login, if that is incorrect password, or no account.
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/HomePage");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }
  //this is where we return everything to be called in app.js
  //we use a form and card to keep organized and to make it neat.
  //  the card allows us to have all of the login area in the same area
  //the form lets us have input from the user
  return (
    <React.Fragment>
      <Card className="log">
        <h2>Login</h2>
        {error && <Alert variant="danger"> {error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>

          <Button
            className="common-button"
            disabled={loading}
            type="Login"
            className="w-50"
          >
            Login
          </Button>
        </Form>
        <div className="w-50 text-center mt-2">
          Need an account? <Link to="/Signup">Sign Up</Link>
        </div>
      </Card>
    </React.Fragment>
  );
}
