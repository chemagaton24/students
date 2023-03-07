import axios from "axios";
import { CurrencyType, RateType } from "../types/currency";

const currencyCient = {
  getCurrency: () =>
    axios.get<CurrencyType>(
      "https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json"
    ),
  getCurrencyRate: (currency: string) =>
    axios.get<RateType>(
      `https://v6.exchangerate-api.com/v6/679aae77947f03c9abd287ec/pair/USD/${currency}`
    ),
};

export default currencyCient;
