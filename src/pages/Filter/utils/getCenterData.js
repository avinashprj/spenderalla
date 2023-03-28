import { totalAmount } from "services/calculation/calculation";

export function getCenterData(listExpenses) {
  const max = totalAmount(listExpenses)
  const min = 0;
  const minRange = Math.floor(max/5) 
  const maxRange = max - minRange 

  return {max, min, minRange, maxRange}
}