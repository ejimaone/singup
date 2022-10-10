import "./Socials.css";
import InputData from "./InputData";
import Button from "./Button";
import { useState } from "react";

function LoginForm(props) {
  //testing
  function passwordSetter(event) {
    setUserPass(event.target.value);
  }
  //testing
  const intial = "";
  const [userName, setUserName] = useState(intial);
  const [userEmail, setUserEmail] = useState(intial);
  const [userPass, setUserPass] = useState(intial);
  // state for user logging in
  const [success, setSuccess] = useState("");
  // to show input field for password
  const pass = (
    <div className="dataContainer">
      <div>
        {" "}
        <form onChange={passwordSetter}>
          <input className="inpData" />
        </form>
      </div>
      <div>
        {" "}
        <i className="fas fa-lock fav-icon"></i>
      </div>
    </div>
  );

  function getdata(event) {
    if (event.target.type === "text") {
      setUserName(event.target.value);
    } else if (event.target.type === "email") {
      setUserEmail(event.target.value);
    }
  }
  let details = []; //this stores data for the users
  // fuction to generate token(10random numbers)
  function tokenGenerator() {
    const token = [];

    // for (let i = 0; i < 10; i++) {
    //   token.push(Math.floor(Math.random() * 9));
    // }
    while (token.length < 10) {
      token.push(Math.floor(Math.random() * 10));
    }

    return token.join("");
  }

  const tokes = tokenGenerator();
  function signInHandler() {
    let signInDetails = JSON.parse(localStorage.getItem("details"));
    if (localStorage.getItem("details")) {
      signInDetails.find(function (individualData, i) {
        if (userName === individualData.username) {
          if (userEmail === individualData.pass) {
            setSuccess(true);

            props.liftSucces(true);

            signInDetails[i] = {
              ...individualData,
              token: tokes,
            };
            // lift success state up

            // set details to local storage with the new token
            localStorage.setItem("details", JSON.stringify(signInDetails));
            // set the last user login to local storage, to enable always user to be loggin always untill pressing logout
            localStorage.setItem("activeUser", tokes);
          } else alert("username or password is wrong");
        }
        if (individualData.username !== userName) {
          setSuccess(false);
          alert("username or password is wrong");
        }
      });
    }
  }

  // experiment
  // function chill() {
  //   console.log("finish loading");
  // }
  // if (success) {
  //   setTimeout(chill, 20000);
  // }

  function signUpHandler() {
    if (localStorage.getItem("details")) {
      details = JSON.parse(localStorage.getItem("details")); // get stored data from local storage
    }
    // push new details to the stored array ( details) only if the input are filled up with atleast 1 string
    if (userName.length > 0 && userEmail.length > 0 && userPass.length > 0) {
      details.push({
        username: userName,
        useremail: userEmail,
        pass: userPass,
        token: "",
      });
    }

    details = localStorage.setItem("details", JSON.stringify(details)); // set the push items
    setUserPass("");
    // console.log(details);
  }

  return (
    <div className="formContainer">
      <InputData
        className="fas fa-user-alt"
        type="text"
        change={getdata}
        value={userName}
        placeholder="Usename"
      />
      <InputData
        className={
          props.display.signIn ? "fas fa-lock fav-icon" : "fa fa-envelope"
        }
        placeholder={props.display.signIn ? "Password" : "Email"}
        type="email"
        value={userEmail}
        change={getdata}
      />
      {props.display.signIn ? null : pass}
      {props.display.signIn ? (
        <Button name="Sign In" className="login" action={signInHandler} />
      ) : (
        <Button name="Sign Up" className="login" action={signUpHandler} />
      )}
    </div>
  );
}

export default LoginForm;
