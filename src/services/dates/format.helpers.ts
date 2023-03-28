export function getCurrentDate(): Date {
  return new Date();
}

export function getYear(date: Date): number {
  return date.getFullYear();
}

export function getDay(date: Date): number {
  return date.getDate();
}

export function getMonth(date: Date): number {
  return date.getMonth();
}

export function getDateStartOfMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1);
}

export function getDateEndtOfMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month + 1, 0);
}

export function getMonthString(date: Date) {
  // Example return value: "September"
  let formatter = new Intl.DateTimeFormat("en-US", { month: "long" });
  return formatter.format(date);
}

export function getMonthStringShort(date: Date) {
  // Example return value: "Sep, Mar, Apr"
  let formatter = new Intl.DateTimeFormat("en-US", { month: "long" });
  const d = formatter.format(date);
  if (d === "July" || d === "June") {
    return d;
  } else if(d === "September") {
    return d.slice(0, 4);
  } else {
    return d.slice(0, 3);
  }
}

export function getDayOfWeek(date: Date): string {
  // Example return value: "Monday"
  let formatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
  return formatter.format(date);
}

export function howDaysInMonth(date: Date): number {
  const [year, month] = [date.getFullYear(), date.getMonth()];

  return new Date(year, month + 1, 0).getDate();
}