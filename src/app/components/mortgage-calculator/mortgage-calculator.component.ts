import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MORTGAGE_MOCK } from './mock/mortgage.mock';
import { MortgageSimulation, RateFlag } from './models/mortgage-calculator.interfaces';

@Component({
  selector: 'mortgage-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CurrencyPipe],
  templateUrl: './mortgage-calculator.component.html',
  styleUrl: './mortgage-calculator.component.scss'
})
export class MortgageCalculatorComponent implements OnInit {
  mortgageMock = MORTGAGE_MOCK;

  // Event emitter to notify of the calculated monthly repayment
  @Output() monthlyRepaymentCalculated = new EventEmitter<number>();

  mortgageFormGroup = new FormGroup({
    amount: new FormControl<number>(this.mortgageMock.amount, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    interestRate: new FormControl<number>(this.mortgageMock.interestRate, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    duration: new FormControl<number>(this.mortgageMock.duration, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    installments: new FormControl<number>(this.mortgageMock.installments, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    rateFlag: new FormControl<RateFlag>(this.mortgageMock.rateFlag, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  monthlyRepayment = 0;
  history: MortgageSimulation[] = [];
  compared: MortgageSimulation[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem(this.mortgageMock.storageKey);
    if (saved) {
      this.history = JSON.parse(saved);
    }
  }

  // Calculates the repayment installment, emits the result, and saves the simulation to history
  calculateMonthlyRepayment(): void {
    if (this.mortgageFormGroup.invalid) return;

    const { amount, interestRate, duration, installments, rateFlag } =
      this.mortgageFormGroup.getRawValue();

    const appliedRate = rateFlag === 'V'
      ? interestRate + this.mortgageMock.variableRateAdd
      : interestRate;

    const installmentsPerYear = installments / duration;
    const periodicRate = appliedRate / 100 / installmentsPerYear;

    const rawPayment = periodicRate === 0
      ? amount / installments
      : (amount * periodicRate) / (1 - Math.pow(1 + periodicRate, -installments));

    this.monthlyRepayment = this.round2(rawPayment);
    this.monthlyRepaymentCalculated.emit(this.monthlyRepayment);

    const entry: MortgageSimulation = {
      id: Date.now(),
      amount: this.round2(amount),
      interestRate: this.round2(interestRate),
      appliedRate: this.round2(appliedRate),
      duration,
      installments,
      rateFlag,
      monthlyRepayment: this.monthlyRepayment,
    };

    this.history = [entry, ...this.history];
    localStorage.setItem(this.mortgageMock.storageKey, JSON.stringify(this.history));
  }

  // Adds or removes a simulation from the comparison list
  toggleCompare(sim: MortgageSimulation): void {
    const exists = this.compared.some((item) => item.id === sim.id);
    if (exists) {
      this.compared = this.compared.filter((item) => item.id !== sim.id);
    } else {
      this.compared = [...this.compared.slice(-1), sim];
    }
  }

  // Checks whether a simulation is currently selected for comparison
  isCompared(id: number): boolean {
    return this.compared.some((item) => item.id === id);
  }
 
  clearHistory(): void {
    this.history = [];
    this.compared = [];
    localStorage.removeItem(this.mortgageMock.storageKey);
  }

  private round2(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}