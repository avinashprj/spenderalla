import { Budget, IExpense } from "types/types";

export const budgetPercentage = (arr: IExpense[], budget: Budget): number => {
  return Math.round((arr.reduce((a, b) => a + b.amount, 0) * 100) / budget);
};

export const totalAmount = (arr: IExpense[] | undefined): number => {
  if (arr === undefined) {
    return 0;
  } else {
    return arr.reduce((a, b) => a + b.amount, 0);
  }
};

export const verticalChart = ({ expensesList }): [string[], number[] | []] => {
  const obj = {
    Total: 0,
    Bills: 0,
    Food: 0,
    Clothes: 0,
    Transport: 0,
    Fun: 0,
    Other: 0,
  };

  for (let el of expensesList) {
    if (el.category in obj) {
      obj[el.category] = obj[el.category] + el.amount;
      obj.Total = obj.Total + el.amount;
    } else {
      obj[el.category] = 0;
      obj[el.category] = obj[el.category] + el.amount;
      obj.Total = obj.Total + el.amount;
    }
  }

  return [Object.keys(obj), Object.values(obj)];
};
