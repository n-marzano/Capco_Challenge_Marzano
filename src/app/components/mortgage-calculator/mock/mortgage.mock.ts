import { RateFlag } from "../models/mortgage-calculator.interfaces";

export const MORTGAGE_MOCK = {
  storageKey: 'mortgageHistory',
  amount: 200000,
  interestRate: 3.5,
  duration: 25,
  installments: 300,
  rateFlag: 'F' as RateFlag,
  variableRateAdd: 0.5,
};