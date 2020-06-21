import messages from '../../client/src/messages'

before(function() {
  cy.task('resetDatabase')
})

describe('the home page.', function() {
  before(function() {
    cy.visit('/')
  })

  it('displays the slogan even after coming back from another page', function() {
    cy.title().should('eq', messages.slogan)
    cy.visit('/person/create')
    cy.title().should('not.eq', messages.slogan)
    cy.visit('/')
    cy.title().should('eq', messages.slogan)
  })

  it('has the slogan as the page title', function() {
    cy.title().should('eq', messages.slogan)
  })

  it('displays the logo.', function() {
    cy.get('.image')
  })

  it('displays a search box.', function() {
    cy.get('#omnibox input')
  })

  it('focuses the search box.', function() {
    cy.get('#omnibox input').focused()
  })

  it("displays a 'learn more' button in the content area", () => {
    cy.get('a').contains('Learn more')
  })

  it('does not display a home icon button', function() {
    cy.get('#home').should('not.exist')
  })
})

describe('every page other than the home page', function() {
  before(function() {
    cy.visit('/person/create')
  })

  it('displays a home icon button', function() {
    cy.get('#home')
      .find('img')
      .should('have.attr', 'src')
      .and('contains', 'home')
  })
})
