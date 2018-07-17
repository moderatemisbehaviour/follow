describe('User journeys.', function () {

})

describe('Landing on the home page.', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('Displays the logo.', function () {
    cy.get('.App-logo')
  })

  it('Displays a search box.', function () {
    cy.get('.Search-input')
  })

  it('Focuses the search box.', function () {
    cy.get('.Search-input').focused()
  })
})

describe('Searching for a publisher profile.', function () {
  it('Displays search results when text is entered into the search input.', function () {
    cy.get('.Search-input').type('Si')
    cy.get('.SearchResult').should('have.length', 2)
  })
})

describe('Creating a publisher profile.', function () {

})

describe('Viewing a publisher profile.', function () {
  it('Does stuff.', function () {
    cy.visit('/person/1')
  })
})
