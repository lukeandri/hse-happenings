//this signUp is very similar to login.js
import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//we create refs for email and password so then we can sign them up and have those users
//we also make one for the password confrimation field.
export default function Signup() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const { signup } = useAuth("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //this if statement helps us make sure signUp.js is working properly
  async function handleSubmit(e) {
    e.preventDefault();
    //this first if statement tells us that if the password and password confirmation
    // dont match then it is wrong
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Incorrect Password");
    }
    try {
      //this directs them to the homepage if their signup is successful
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/HomePage");
    } catch (e) {
      //this if there is another problem, for example the email is already being used
      //with not let them create an account.
      console.log(e);
      setError("Failed to create account");
    }
    setLoading(false);
  }
  return (
    //all of this allows is pretty much the same as login
    //we return everything to be called in App later,
    //and then we use form to have fields for them to fill out
    //and a card to create organization and neat
    //and it has to be wrapped in a React Fragment otherwise it crashes.
    <React.Fragment>
      <Card>
        <h2 className="text-center mb-4">Sign up</h2>
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
          <Form.Group id="password-confirm">
            <Form.Label>password confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} type="submit" className="w-50">
            Sign Up
          </Button>
        </Form>
        <div className="w-50 text-center mt-2">
          Already have an account? <Link to="/login">Login </Link>{" "}
        </div>
      </Card>
    </React.Fragment>
  );
}
