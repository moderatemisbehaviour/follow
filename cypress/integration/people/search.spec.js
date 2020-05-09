beforeEach(function() {
  cy.task('resetDatabase')
})

describe('state on page load', function() {
  beforeEach(function() {
    cy.task('createPerson').as('person')
    cy.visit('/')
  })

  it('updates the document title to "Searching for [query]"', function() {
    cy.get('#omnibox input')
      .type('Si')
      .should('have.value', 'Si')
    cy.title().should('eq', 'Searching for Si')
  })

  it('updates the search query param', function() {
    cy.get('#omnibox input')
      .type('Si')
      .should('have.value', 'Si')
    cy.url().should('match', /\/?Si/)
  })

  it('uses the query param if there is nothing in the input', function() {
    cy.visit('/?Si')
    cy.get('#omnibox input').should('have.value', 'Si')
  })
})

describe('performance', function() {
  beforeEach(function() {
    cy.task('createPerson').as('person')
  })

  it('debounces the searching to save on network requests', function() {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch')
      }
    })
    cy.get('#the-input')
      .type('Siob')
      .get('.results')
    cy.window().then(window => {
      // TODO: Why doesn't the Cypress ESLint plugin take care of this?
      // eslint-disable-next-line no-unused-expressions
      expect(window.fetch).to.be.calledTwice
    })
  })

  it.skip('hits the cache for pages of search results that have already been loaded', function() {})
})

describe('one or more search results', function() {
  beforeEach(function() {
    // TODO: Find a way to use before.
    cy.task('resetDatabase')
    cy.task('createPeople').as('people')
    cy.visit('/')
    cy.get('#the-input').type('Si')
  })

  it('displays search results when text is entered into the search input.', function() {
    cy.get('.result').should('not.have.length', 0)
  })

  it('displays no more than 5 results at a time.', function() {
    cy.get('.result').should('have.length', 5)
  })

  it('displays mini person images in the search results', function() {
    cy.get('.result')
      .first()
      .find('.image')
      .should('have.css', 'background-image', `url("${this.people[0].image}")`)
  })

  it('provides buttons for navigating through pages of search results', function() {
    cy.get('.page').should('have.length', 3)

    cy.get('.current-page').should('have.text', '1')
    cy.contains('Siobhan Wilson 1')
    cy.get('.result')
      .eq(0)
      .should('have.text', 'Siobhan Wilson 1')

    cy.get('.page')
      .contains('2')
      .click()
    cy.get('.current-page').should('have.text', '2')
    cy.contains('Siobhan Wilson 6')
    cy.get('.result')
      .eq(0)
      .should('have.text', 'Siobhan Wilson 6')

    cy.get('.page')
      .contains('3')
      .click()
    cy.get('.current-page').should('have.text', '3')
    cy.contains('Siobhan Wilson 11')
    cy.get('.result')
      .eq(0)
      .should('have.text', 'Siobhan Wilson 11')

    cy.get('.page')
      .contains('1')
      .click()
    cy.get('.current-page').should('have.text', '1')
    cy.get('.result')
      .eq(0)
      .should('have.text', 'Siobhan Wilson 1')

    cy.get('.page')
      .contains('2')
      .click()
    cy.get('.current-page').should('have.text', '2')
    cy.contains('Siobhan Wilson 6')
    cy.get('.result')
      .eq(0)
      .should('have.text', 'Siobhan Wilson 6')
  })

  it("navigates to the person's profile when a search result is clicked", function() {
    cy.get('.result')
      .first()
      .click()
    cy.url().should('match', /.+\/person\/\d+/)
  })
})

describe('no search results', function() {
  beforeEach(function() {
    cy.visit('/')
    cy.get('#the-input').type('xfh')
    cy.get('.results')
    cy.get('.result').should('not.exist')
  })

  it('displays a message that there are 0 search results', function() {
    cy.get('.results').contains('0 search results')
  })
})

describe('end of search results', function() {
  it('')
})

describe('the search input', () => {
  beforeEach(function() {
    cy.task('resetDatabase')
    cy.task('createPeople')
    cy.visit('/')
  })

  it('closes the search results when a search result is selected', function() {
    cy.get('#omnibox input').type('Si') // TODO: Use #the-input selector instead
    cy.get('.result')
      .first()
      .click()
    cy.get('.results').should('have.length', 0)

    // Check it also works for cached search results
    cy.get('#omnibox input').type('Si') // TODO: Use #the-input selector instead
    cy.get('.result')
      .last()
      .click()
    cy.get('.results').should('have.length', 0)

    cy.get('#omnibox input').type('Si') // TODO: Use #the-input selector instead
    cy.get('.result')
      .first()
      .click()
    cy.get('.results').should('have.length', 0)
  })

  it('stops displaying search results when text is cleared from the search input.', function() {
    cy.get('#omnibox input')
      .type('Si')
      .should('have.value', 'Si')
    cy.get('#omnibox input')
      .clear()
      .should('have.value', '')
    cy.get('.result').should('have.length', 0)
  })

  it.skip('closes the search results when the search input loses focus', function() {})
})

describe('keyboard shortcuts', () => {
  beforeEach(() => {
    cy.task('resetDatabase')
    cy.task('createPeople')
    cy.visit('/')
  })

  it('allows the user to navigate between the search input and search results with the arrow keys', function() {
    cy.get('#omnibox input').type('Si')

    cy.get('.result')
    cy.get('#omnibox input').type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 1')

    cy.focused().type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 2')

    cy.focused().type('{downarrow}')
    cy.focused().type('{downarrow}')
    cy.focused().type('{downarrow}')
    cy.focused().type('{downarrow}')
    cy.focused().type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 5')

    cy.focused().type('{uparrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 4')

    cy.focused().type('{uparrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 3')

    cy.focused().type('{uparrow}')
    cy.focused().type('{uparrow}')
    cy.focused().should('have.text', 'Siobhan Wilson 1')

    cy.focused().type('{uparrow}')
    cy.focused().should('have.value', 'Si')
  })
})

describe('the cache', () => {
  it('is updated after a new person is created', () => {
    cy.visit('/')

    cy.get('#omnibox input').type('Si')
    cy.get('.results-count').contains(0)
    cy.get('.result').should('have.length', 0)

    cy.fixture('siobhan.json').then(siobhan => {
      cy.task('createPerson', siobhan)
    })

    cy.get('#omnibox input').clear()
    cy.get('.results').should('not.exist')
    cy.get('#omnibox input').type('Si')
    cy.get('.result').should('have.length', 1)
    cy.get('.results-count').contains(1)
  })
})
