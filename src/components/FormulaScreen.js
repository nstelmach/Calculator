import classes from "./FormulaScreen.module.css";

function FormulaScreen(props) {
  return <div className={classes.formulaScreen}>{props.value}</div>;
}

export default FormulaScreen;
