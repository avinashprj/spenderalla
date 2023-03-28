import { useSelector } from "react-redux"
import { getCurrencySymbol } from "services/currency.helpers"
import { statusUser, user } from "./userSlice"

export const CurrentCurrency = () => {
  const {currency} = useSelector(user)
  const status = useSelector(statusUser)

  let rendered;

  rendered = status === "succeeded" ? <span>{getCurrencySymbol(currency)}</span> : '#'

  return rendered
}