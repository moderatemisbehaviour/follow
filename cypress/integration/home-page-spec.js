describe('Landing on the home page.', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('Displays the logo.', function () {
    cy.get('#logo')
  })

  it('Displays a search box.', function () {
    cy.get('#search')
  })

  it('Focuses the search box.', function () {
    cy.get('#search').focused()
  })
})

describe('Viewing a publisher profile.', function () {
  it('Does stuff.', function () {
    cy.visit('/person/1')
  })
})
