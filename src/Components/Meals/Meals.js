import { Fragment } from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSmmary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
