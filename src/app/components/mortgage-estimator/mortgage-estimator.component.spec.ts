import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageEstimatorComponent } from './mortgage-estimator.component';

describe('MortgageEstimatorComponent', () => {
  let component: MortgageEstimatorComponent;
  let fixture: ComponentFixture<MortgageEstimatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgageEstimatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageEstimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
