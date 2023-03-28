export const filterListExpense = (expensesList, searchParams) => {
  return expensesList
  .filter(el => searchParams.category.some(e => el.category === e))
  .filter(elem => elem.amount >= searchParams.range[0] && elem.amount <= searchParams.range[1])
}