import { IExpense, IListExpenses } from "types/types"

export function prepareListExpenses(expenses: IExpense[]): { listExpenses: IListExpenses; listDates: string[] } {
  let listExpenses: IListExpenses = {}

  expenses.forEach(e => {
    const date = new Date(Date.parse(e.date)).getFullYear() + "-" + new Date(Date.parse(e.date)).getMonth() + "-" + new Date(Date.parse(e.date)).getDate()

    const isExists = date in listExpenses

    if (isExists) {
      listExpenses[date].push(e)
    } else {
      listExpenses[date] = []
      listExpenses[date].push(e)
    }
  })

  const listDates: string[] = Object.keys(listExpenses);

  return { listExpenses, listDates }
}