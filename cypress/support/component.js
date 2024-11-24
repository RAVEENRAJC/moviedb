// cypress/support/component.js

// Cypress global configurations for component testing
Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test due to uncaught exceptions
    return false;
  });
  
  // Custom command example
  Cypress.Commands.add('mountComponent', (component) => {
    cy.mount(component);  // Assuming you're using Cypress's mount function for component testing
  });
  