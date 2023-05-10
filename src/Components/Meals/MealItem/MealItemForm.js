import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  const amountSubmitHandler = (e) => {
    e.preventDefault();
    console.log(amountInputRef);
    console.log(amountInputRef.current);
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
    }
    props.addToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={amountSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {isAmountValid && <p>Enter a valid number (1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;
