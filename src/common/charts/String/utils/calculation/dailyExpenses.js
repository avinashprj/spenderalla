export const dailyExpenses = (listDaysInMonth, expensesList) => {
  const obj = {}

  listDaysInMonth.forEach(el => {
    obj[el] = 0

    expensesList.forEach(expense => {
      if (new Date(expense.date).getDate() === el) {
        obj[el] += expense.amount
      }
    })
  })

  let dates = Object.keys(obj);
  let amount = Object.values(obj);

  return {dates, amount}
}