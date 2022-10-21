import classes from "./OutputDisplay.module.css";

function OutputDisplay(props) {
  return (
    <div className={classes.outputScreen} id={props.id}>
      {props.value}
    </div>
  );
}

export default OutputDisplay;
