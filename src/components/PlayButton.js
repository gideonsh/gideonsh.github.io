import classes from "./PlayButton.module.css";

const PlayButton = (props) => {
  return (
    <button className={classes.pad} onClick={props.onClick}>
      <span>{props.name}</span>
    </button>
  );
};

export default PlayButton;
