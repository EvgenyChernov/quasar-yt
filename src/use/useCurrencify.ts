import {useStoreSetting} from "stores/storeSetting";

const storeSetting = useStoreSetting();

export function useCurrencify(amount: number) {
  //

  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const currencySymbol = storeSetting.settings.currencySymbol,
    amountPositive = Math.abs(amount),
    amountFormatted = amountPositive.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  return `${posNegSymbol} ${amountFormatted} ${currencySymbol}`
}