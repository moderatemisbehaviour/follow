describe('User journeys.', function () {

})

describe('Landing on the home page.', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('Displays the logo.', function () {
    cy.get('.Avatar')
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
    cy.get('.Search-input').type('Si').should('have.value', 'Si')
    cy.get('.SearchResult').should('have.length', 2)
  })

  it('Stops displaying search result when text is cleared from the search input.', function () {
    cy.get('.Search-input').clear().should('have.value', '')
    cy.get('.SearchResult').should('have.length', 0)
  })
})

describe('Creating a publisher profile.', function () {

})

describe('Viewing a publisher profile.', function () {
  it('Does stuff.', function () {
    cy.visit('/person/1')
  })
})
