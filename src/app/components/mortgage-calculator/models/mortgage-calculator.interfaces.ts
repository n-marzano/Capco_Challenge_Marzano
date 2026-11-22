export type RateFlag = 'F' | 'V';

export interface MortgageSimulation {
  id: number;
  amount: number;
  interestRate: number;
  appliedRate: number;
  duration: number;
  installments: number;
  rateFlag: RateFlag;
  monthlyRepayment: number;
}