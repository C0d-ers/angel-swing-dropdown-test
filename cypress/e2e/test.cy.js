describe('Dropdown Options Verification', () => {
  // Load dropdown options from the JSON file before tests
  let dropdownOptions = [];

  before(() => {
    // Load dropdown options via task
    cy.task('readJsonFile', 'cypress/fixtures/dropdown-options.json').then((options) => {
      dropdownOptions = options;
    });

    // Visit the base URL
    cy.visit('/', {
      headers: { 'Accept-Language': 'en-NP' },
    });
  });

  // Dynamically generate test cases for each dropdown option
  dropdownOptions.forEach((option) => {
    it(`should select and verify dropdown value: ${option}`, () => {
      // Ensure dropdown is visible and interactable
      cy.get('#searchDropdownBox')
        .invoke('css', 'opacity', '1')
        .should('have.css', 'opacity', '1')
        .should('be.visible');

      // Find the option and verify selection
      cy.get('#searchDropdownBox')
        .find('option')
        .contains(option) // Find the specific option
        .then(($option) => {
          cy.get('#searchDropdownBox')
            .invoke('val', $option.val()) // Set value
            .trigger('change'); // Trigger change event

          // Verify the dropdown has the correct value
          cy.get('#searchDropdownBox').should('have.value', $option.val());
        });
    });
  });
});
