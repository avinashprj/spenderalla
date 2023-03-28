export function getCurrencySymbol(currency) {
    const symbol = {
        EUR: "€",
        RUB: "₽",
        USD: "₹",
    };

    return symbol[currency];
}
