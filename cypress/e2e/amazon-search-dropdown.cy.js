describe('Dropdown Options Selection and Validation', () => {
  before(() => {
    cy.visit('/', {
     headers: { 'Accept-Language': 'en-NP' }
   });
  });

 it('should select and validate each option in the dropdown', () => {
   cy.get('#searchDropdownBox')
     .invoke('css', 'opacity', '1')
     .should('have.css', 'opacity', '1')
     .should('be.visible');

   cy.fixture('dropdown-options').then((dropdownOptions) => {
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
