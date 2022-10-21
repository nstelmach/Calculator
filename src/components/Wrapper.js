import classes from "./Wrapper.module.css";

function Wrapper(props) {
  return <div className={classes.calculator}>{props.children}</div>;
}

export default Wrapper;
