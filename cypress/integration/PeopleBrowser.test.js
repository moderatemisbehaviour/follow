const BASE_URL = Cypress.config('baseUrl')

xdescribe('User journeys.', function () {})

describe('Landing on the home page.', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('Displays the slogan', function () {
    cy.get('.App-name').should('have.text', 'Follow people, not platforms')
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

  it('Allows the user to select a search result with the keyboard.', function () {
    cy.get('.Search-input').type('Si').type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson')
    cy.get('.SearchResult:first').click() // TODO: Find out how to simulate user pressing {enter}
    cy.url().should('eq', `${BASE_URL}/person/1`)
  })
})

describe('Creating a publisher profile.', function () {

})

describe('Viewing a publisher profile.', function () {
  beforeEach(() => {
    cy.visit('/person/1') // TODO: Doesn't work until baseUrl is hit...
  })

  it("Updates the avatar to show the person's profile photo.", function () {
    cy.get('.App-name').should('have.text', 'Siobhan Wilson')
  })

  it("Shows links to the publisher's profiles", function () {
    cy.get('.Profile').should('have.length', 3)
    cy.get('.Profile a').first().should('have.attr', 'href').and('eq', 'https://twitter.com/siobhanisback')
    cy.get('.Profile a').eq(1).should('have.attr', 'href').and('eq', 'https://www.youtube.com/user/siobhanwilsonmusic')
    cy.get('.Profile a').eq(2).should('have.attr', 'href').and('eq', 'https://www.facebook.com/siobhanwilsonmusic')
  })

  it("Masks the publisher's photo to create a circular frame", function () {
    cy.get('.Avatar img').should('have.css', 'border-radius').should('equal', '50%')
  })
})
