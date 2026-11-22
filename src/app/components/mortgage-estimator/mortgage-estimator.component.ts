import { Component } from '@angular/core';
import { MortgageCalculatorComponent } from '../mortgage-calculator/mortgage-calculator.component';

@Component({
  selector: 'mortgage-estimator',
  standalone: true,
  imports: [MortgageCalculatorComponent],
  templateUrl: './mortgage-estimator.component.html',
  styleUrl: './mortgage-estimator.component.scss'
})
export class MortgageEstimatorComponent {

  onRepaymentCalculated(value: number): void {
    console.log('Calculated Monthly Repayment:', value);
  }

}
