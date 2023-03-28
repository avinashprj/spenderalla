export function getPrepareObj(expensesList) {
  const objExpenses = {};
  let currentDate;

  expensesList.forEach((e) => {
    if (e.current) {
      currentDate = new Date(e.year, e.month);
    }

    if (e.year in objExpenses) {
      objExpenses[e.year].push(e.month);
    } else {
      objExpenses[e.year] = [];
      objExpenses[e.year].push(e.month);
    }
  });

  return {objExpenses, currentDate}
}