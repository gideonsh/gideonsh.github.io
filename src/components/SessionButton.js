import classes from "./SessionButton.module.css";

const SessionButton = (props) => {
  return (
    <button className={classes.pad} onClick={props.onClick}>
      <span>{props.name}</span>
    </button>
  );
};

export default SessionButton;
