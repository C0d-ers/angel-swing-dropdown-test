describe('Dropdown Options Selection and Validation', () => {
  beforeEach(() => {
    cy.visit('/', {
     headers: { 'Accept-Language': 'en-NP' }
   });
  });

  it('should validate dropdown options with the existing JSON file', () => {
    // Load the existing JSON file
    cy.fixture('dropdown-options.json').then((expectedOptions) => {
      const actualOptions = []; // Array to hold the extracted dropdown options

      // Get the dropdown element and extract all options
      cy.get('#searchDropdownBox')
        .find('option')
        .each(($option) => {
          const optionText = $option.text().trim(); // Extract and trim the text
          actualOptions.push(optionText); // Add to the actual options array
        })
        .then(() => {
          // Assert that the actual options match the expected options
          expect(actualOptions).to.deep.equal(expectedOptions);
        });
    });
  });

 it('should select and validate each option in the dropdown', () => {
   cy.get('#searchDropdownBox')
     .invoke('css', 'opacity', '1')
     .should('have.css', 'opacity', '1')
     .should('be.visible');

   cy.fixture('dropdown-options.json').then((dropdownOptions) => {
     dropdownOptions.forEach((dropdownOption) => {
       cy.get('#searchDropdownBox')
         .find('option')
         .contains(dropdownOption) // Use the current dropdown option from the array
         .then(($option) => {
           let firstVisibleWord = $option.text().split(' ')[0].replace(/[^a-zA-Z]/g, '');
           // Set the dropdown value and trigger change
           cy.get('#searchDropdownBox')
             .invoke('val', $option.val());
   
           // Verify the correct option is selected
           cy.get('#searchDropdownBox')
             .should('have.value', $option.val())
             .should('exist')
             .and('be.visible')
             .screenshot(`screenshot_${firstVisibleWord}`); 
         });
     });
   });
 });
});
