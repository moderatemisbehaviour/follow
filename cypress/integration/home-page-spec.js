describe('The home page.', function() {
  beforeEach(function () {
    cy.visit('/')
  })

  it('Displays the logo.', function () {
    cy.get('#logo')
  })

  it('Displays a search box.', function () {
    cy.get('#search')
  })
})
