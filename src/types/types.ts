export type UserID = string
export type UID = string
export type Budget = number
export type Email = string
export type Month = number
export type Year = number
export type Category = 'Bills' | 'Food' | 'Clothes' | 'Transport' | 'Fun' | 'Other'
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
export type Error = string | null
export type Currency = 'USD' | 'RUB' | 'EUR' | ""
export type listDatesCompare = [{from: Date, to: Date}, {from: Date, to: Date}]

export interface INewExpense {
  amount: number;
  repeat: boolean;
  category: Category;
  message: string;
  file: string;
  date: Date,
}

export interface IExpense {
  id: string;
  amount: number;
  repeat: boolean;
  category: Category;
  message: string;
  file: string;
  date: string;
}

export interface IBudget {
  budget: Budget;
  year: Year;
  month: Month;
}

export interface IActivity {
  year: Year;
  month: Month;
  current: boolean;
}

export interface IUser {
  userId: UserID;
  email: Email;
  currency: Currency;
}

export interface IListExpenses {
  [index: string]: IExpense[];
}