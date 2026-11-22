import { TestBed } from '@angular/core/testing';
import { MortgageCalculatorComponent } from './mortgage-calculator.component';
import { MortgageSimulation } from './models/mortgage-calculator.interfaces';

describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;

  const mockSim: MortgageSimulation = {
    id: 1,
    amount: 200000,
    interestRate: 3.5,
    appliedRate: 3.5,
    duration: 25,
    installments: 300,
    rateFlag: 'F',
    monthlyRepayment: 1001.25,
  };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [MortgageCalculatorComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('loads history on init', () => {
    localStorage.setItem(component.mortgageMock.storageKey, JSON.stringify([mockSim]));
    component.ngOnInit();

    expect(component.history).toEqual([mockSim]);
  });

  it('calculates repayment, emits value and saves history', () => {
    const emitSpy = jest.spyOn(component.monthlyRepaymentCalculated, 'emit');

    component.mortgageFormGroup.setValue({
      amount: 200000,
      interestRate: 3.5,
      duration: 25,
      installments: 300,
      rateFlag: 'F',
    });

    component.calculateMonthlyRepayment();

    expect(component.monthlyRepayment).toBe(1001.25);
    expect(emitSpy).toHaveBeenCalledWith(1001.25);
    expect(component.history.length).toBe(1);
    expect(localStorage.getItem(component.mortgageMock.storageKey)).toBeTruthy();
  });

  it('adds variableRateAdd when rateFlag is V', () => {
    component.mortgageFormGroup.setValue({
      amount: 150000,
      interestRate: 2.5,
      duration: 20,
      installments: 240,
      rateFlag: 'V',
    });

    component.calculateMonthlyRepayment();

    expect(component.history[0].appliedRate).toBe(2.5 + component.mortgageMock.variableRateAdd);
  });

  it('toggles comparison and keeps max 2 items', () => {
    const firstSimulation = { ...mockSim, id: 1 };
    const secondSimulation = { ...mockSim, id: 2 };
    const thirdSimulation = { ...mockSim, id: 3 };

    component.toggleCompare(firstSimulation);
    expect(component.isCompared(1)).toBe(true);

    component.toggleCompare(secondSimulation);
    expect(component.isCompared(1)).toBe(false);

    component.toggleCompare(firstSimulation);
    component.toggleCompare(secondSimulation);
    component.toggleCompare(thirdSimulation);
    expect(component.compared.map((x) => x.id)).toEqual([2, 3]);
  });

  it('clears history, comparison and localStorage', () => {
    component.history = [mockSim];
    component.compared = [mockSim];
    localStorage.setItem(component.mortgageMock.storageKey, JSON.stringify([mockSim]));

    component.clearHistory();

    expect(component.history).toEqual([]);
    expect(component.compared).toEqual([]);
    expect(localStorage.getItem(component.mortgageMock.storageKey)).toBeNull();
  });
});