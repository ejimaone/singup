import BtnContainer from "./components/BtnContainer";
import "./App.css";
import Socials from "./components/Socials";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Button from "./components/Button";
import Welcome from "./components/Welcome";

function App() {
  const [display, setDisplay] = useState({
    signIn: true,
    signUp: false,
  });
  const [page, setPage] = useState(true);
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // useEffect(() => {}, []);

  // On windows load

  let User = "";
  const local = localStorage.getItem("activeUser");
  useEffect(() => {
    if (local) {
      const lastUserToken = localStorage.getItem("activeUser");
      const lastUser = JSON.parse(localStorage.getItem("details"));

      lastUser.find(function (user) {
        if (lastUserToken === user.token) {
          // console.log(user);

          setPage(user);
          setSuccess(true);
        }
      });
    }
  }, [success]);

  function liftSucces(success) {
    setSpinner(true);
    setTimeout(() => {
      setSuccess(success);
      setSpinner(false);
    }, 5000);
  }
  function signInHandler(event) {
    setDisplay((prev) => ({
      signIn: !prev.signIn,
      signUp: !prev.signUp,
    }));
    console.log(display);
  }

  function signUpHandler(event) {
    setDisplay((prev) => ({
      signIn: !prev.signIn,
      signUp: !prev.signUp,
    }));
  }

  function logoutHandler() {
    if (local) {
      localStorage.removeItem("activeUser");
    }
    window.location.reload();
  }
  return (
    <div className="app">
      {!success && !spinner ? (
        <BtnContainer
          signInHandler={signInHandler}
          signUpHandler={signUpHandler}
          display={display}
          success={success}
        />
      ) : null}
      {!success && !spinner && !local ? <Socials /> : null}
      {!success && !spinner && !local ? (
        <LoginForm display={display} liftSucces={liftSucces} />
      ) : null}
      {success && local ? (
        <Button className="logout" name="logout" action={logoutHandler} />
      ) : null}
      {spinner && <div className="loader"></div>}
      {success && !local ? <Welcome name={User.username} /> : null}
      {local && success ? <Welcome name={page.username} /> : null}
    </div>
  );
}

export default App;
