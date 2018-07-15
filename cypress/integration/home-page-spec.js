describe('User journeys.', function () {

})

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

describe('Searching for a publisher profile.', function () {

})

describe('Creating a publisher profile.', function () {

})

describe('Viewing a publisher profile.', function () {
  it('Does stuff.', function () {
    cy.visit('/person/1')
  })
})
