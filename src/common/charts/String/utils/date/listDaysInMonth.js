import { howDaysInMonth } from "services/dates/format.helpers";

export const listDaysInMonth = (activity) => {
const daysInMonth = howDaysInMonth(new Date(activity.year, activity.month))

return {
  list: new Array(daysInMonth).fill(0).map((e, i) => i+1),
  days: daysInMonth
}
}