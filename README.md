# Mortgage Estimator (Angular 18)

A mortgage repayment calculator built with Angular 18, reactive forms, fixed and variable interest rate support, persistent localStorage history, side-by-side simulation comparison, @Output() event communication, and unit tests powered by Jest.

## Architectural Choices

Standalone Component and ReactiveFormsModule: MortgageCalculatorComponent is built as a standalone component using reactive forms.

History Persistence and comparison: Simulations are saved with unique IDs in localStorage and restored on initialization. 

Users can select up to two simulations for comparison or clear the history and comparison state.

Accessibility: The template uses ARIA attributes (aria-required, aria-invalid, aria-live, aria-pressed, aria-describedby) to support screen readers and keyboard navigation.

Unit Testing with Jest: Tests run on Jest (v14 for Angular 18 compatibility).

## Local Setup

### 1. Prerequisites
Node.js and npm installed locally.

### 2. Install Dependencies
```bash
npm install