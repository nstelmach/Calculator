import { useEffect, useState } from "react";
import OutputDisplay from "./components/OutputDisplay";
import Wrapper from "./components/Wrapper";
import Button from "./components/Button";
import FormulaScreen from "./components/FormulaScreen";
import classes from "./components/Button.module.css";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["/", "*", "+", "-"];
const operatorWithoutMinus = ["/", "*", "+"];
const twoOperators = ["+-", "--", "*-", "/-"];

function App() {
  const [equationChain, setEquationChain] = useState("");
  const [displayValue, setDisplayValue] = useState("0");

  function clearResultHandler() {
    setEquationChain("");
    setDisplayValue("0");
  }

  function minusHandler(value) {
    setDisplayValue((prevState) => {
      if (prevState === "-") {
        if (value === ".") {
          return "0.";
        }
        return value;
      }
      if (value === "-") {
        return value;
      }
    });

    setEquationChain((prevState) => {
      if (value === "-") {
        if (twoOperators.includes(prevState.slice(-2))) {
          return prevState;
        }
        if (prevState.slice(-1) === "-") {
          return prevState.concat(value);
        }
        if (prevState.slice(-1) === ".") {
          return prevState;
        }
      }

      return prevState;
    });
  }

  function addToEquationChainHandler(value) {
    setDisplayValue((prevState) => {
      if (prevState === "0" && numbers.includes(value)) {
        return value;
      }
      if (prevState.includes(".") && value === ".") {
        return prevState;
      }
      if (operators.includes(value)) {
        return value;
      }

      if (operators.includes(prevState)) {
        if (value === ".") {
          return "0.";
        }
        return value;
      }

      return prevState.concat(value);
    });
  }

  useEffect(() => {
    setEquationChain((prevState) => {
      let isOperator = operators.includes(displayValue);
      let isNumber = !isNaN(displayValue);

      if (prevState === "=NaN") {
        return displayValue;
      }

      if (prevState.includes("=")) {
        if (isOperator) {
          return (
            prevState.slice(prevState.indexOf("=") + 1, prevState.length + 1) +
            displayValue
          );
        }
        return prevState.concat(displayValue);
      }

      if (isNumber) {
        if (
          operators.includes(prevState[prevState.length - 2]) &&
          prevState.slice(-1) === "0"
        ) {
          return prevState.slice(0, -1) + displayValue;
        }
        if (displayValue.length > 1) {
          return prevState.slice(0, -(displayValue.length - 1)) + displayValue;
        }
        if (prevState === "0") {
          return prevState.slice(0, -1) + displayValue;
        }
        return prevState.concat(displayValue);
      }
      if (isOperator) {
        if (prevState.slice(-1) === ".") {
          return prevState;
        }
        if (
          operators.includes(prevState[prevState.length - 2]) &&
          prevState.slice(-1) === "-"
        ) {
          return prevState.replace(prevState.slice(-2), displayValue);
        }
        if (
          operators.includes(prevState.slice(-1)) &&
          operatorWithoutMinus.includes(displayValue)
        ) {
          return prevState.slice(0, -1) + displayValue;
        }
      }

      return prevState.concat(displayValue);
    });
  }, [displayValue]);

  function equationElementClickHandler(event) {
    addToEquationChainHandler(event.target.value);
  }

  function resultClickHandler(event) {
    resultHandler(event.target.value);
  }

  function minusClickHandler(event) {
    minusHandler(event.target.value);
  }

  function resultHandler(value) {
    let result = eval(equationChain).toString();
    setDisplayValue(() => {
      if (value === "=") {
        return result;
      }
    });
    setEquationChain((prevState) => {
      if (value === "=") {
        if (prevState === "0") {
          return "=NaN";
        }
        if (prevState.includes("=")) {
          return prevState;
        }

        return prevState.concat("=");
      }
    });
  }

  return (
    <Wrapper>
      <FormulaScreen value={equationChain} />
      <OutputDisplay id="display" value={displayValue} />
      <Button
        onClick={clearResultHandler}
        className={`${classes.bigButton} ${classes.clear}`}
        name="AC"
        id="clear"
      />
      <Button
        onClick={equationElementClickHandler}
        className={classes.operator}
        name="/"
        id="divide"
        value="/"
      />
      <Button
        onClick={equationElementClickHandler}
        className={classes.operator}
        name="x"
        id="multiply"
        value="*"
      />
      <Button
        onClick={equationElementClickHandler}
        name="7"
        id="seven"
        value="7"
      />
      <Button
        onClick={equationElementClickHandler}
        name="8"
        id="eight"
        value="8"
      />
      <Button
        onClick={equationElementClickHandler}
        name="9"
        id="nine"
        value="9"
      />
      <Button
        onClick={minusClickHandler}
        className={classes.operator}
        name="-"
        id="subtract"
        value="-"
      />
      <Button
        onClick={equationElementClickHandler}
        name="4"
        id="four"
        value="4"
      />
      <Button
        onClick={equationElementClickHandler}
        name="5"
        id="five"
        value="5"
      />
      <Button
        onClick={equationElementClickHandler}
        name="6"
        id="six"
        value="6"
      />
      <Button
        onClick={equationElementClickHandler}
        className={classes.operator}
        name="+"
        id="add"
        value="+"
      />
      <Button
        onClick={equationElementClickHandler}
        name="1"
        id="one"
        value="1"
      />
      <Button
        onClick={equationElementClickHandler}
        name="2"
        id="two"
        value="2"
      />
      <Button
        onClick={equationElementClickHandler}
        name="3"
        id="three"
        value="3"
      />
      <Button
        onClick={resultClickHandler}
        className={classes.equals}
        name="="
        id="equals"
        value="="
      />
      <Button
        onClick={equationElementClickHandler}
        className={classes.bigButton}
        name="0"
        id="zero"
        value="0"
      />
      <Button
        onClick={equationElementClickHandler}
        name="."
        id="decimal"
        value="."
      />
    </Wrapper>
  );
}

export default App;
