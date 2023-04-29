import React, { useRef, useState } from "react";
import styles from "./Signupform.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signupform = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async () => {
    // console.log(username.current.value);
    await axios
      .post(
        "http://localhost:8000/user/signup",
        {
          username: username.current.value,
          emailId: email.current.value,
          password: password.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("_id", res.data.user._id);
        localStorage.setItem("username", res.data.user.username);
        history("/");
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <div onSubmit={(event) => event.preventDefault()}>
        <div className={styles.inputContainer}>
          <label>Username </label>
          <input ref={username} type="text" name="uname" required />
          {renderErrorMessage("harsh")}
        </div>
        <div className={styles.inputContainer}>
          <label>Email </label>
          <input ref={email} type="email" name="email" required />
          {renderErrorMessage("harsh")}
        </div>
        <div className={styles.inputContainer}>
          <label>Password </label>
          <input ref={password} type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.app}>
      <div className={styles.loginForm}>
        <div className={styles.title}>Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Signupform;
