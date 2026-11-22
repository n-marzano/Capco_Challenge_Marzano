import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MortgageEstimatorComponent } from './components/mortgage-estimator/mortgage-estimator.component';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MortgageEstimatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mortgage-estimator';
}
