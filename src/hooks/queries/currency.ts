import { useQuery } from "react-query";
import currencyCient from "../../clients/currency";

interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
}

export const useGetCurrency = () =>
  useQuery("CURRENCY", currencyCient.getCurrency);

export const useGetCurrencyRate = (currency: string) =>
  useQuery(["RATE", currency], () => currencyCient.getCurrencyRate(currency), {
    onError: (error: IApiError) => {
      if (error.statusCode === 404) return error.message;
    },
  });
