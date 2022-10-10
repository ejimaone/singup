import Button from "./Button";
function BtnContainer(props) {
  return (
    <div className="btn-container">
      {!props.success ? (
        <Button
          name="Sign in"
          className={props.display.signIn ? "whyte" : "delete"}
          action={props.signInHandler}
        />
      ) : null}
      {!props.success ? (
        <Button
          name="Sign up"
          className={props.display.signUp ? "whyte" : "delete"}
          action={props.signUpHandler}
        />
      ) : null}
    </div>
  );
}

export default BtnContainer;
