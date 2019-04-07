const BASE_URL = Cypress.config('baseUrl')

describe('Landing on the home page.', function () {
  before(function () {
    cy.visit('/person/create')
    cy.visit('/')
  })

  it('Displays the slogan', function () {
    cy.get('.name').should('have.text', 'Follow people, not platforms')
  })

  it('Displays the logo.', function () {
    cy.get('.Avatar')
  })

  it('Displays a search box.', function () {
    cy.get('.Search input')
  })

  it('Focuses the search box.', function () {
    cy.get('.Search input').focused()
  })

  it.skip("Displays a 'learn more' button in the content area", () => {})
})

describe('Searching for a publisher profile.', function () {
  beforeEach(function () {
    cy.task('createPerson').as('person')
    cy.visit('/')
  })

  it('Displays search results when text is entered into the search input.', function () {
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.SearchResult').should('not.have.length', 0)
  })

  it('Displays no more than 5 results at a time.', function () {
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.SearchResult').should('have.length', 5)
  })

  it('Displays mini person images in the search results', function () {
    cy.get('#the-input').type('Si')
    cy.get('.SearchResult').first().get('img').should('have.attr', 'src', this.person.photo)
  })

  it.skip('Allows the user to select a search result with the keyboard.', function () {
    cy.get('.Search input').type('Si').type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson')
    cy.get('.SearchResult').first().click() // TODO: Find out how to simulate user pressing {enter}
    cy.location('pathname').should('eq', '/person/1')
  })

  it('Closes the search results when one is selected', function () {
    cy.get('.Search input').type('Si') // TODO: Use #the-input selector instead
    cy.get('.SearchResult').first().click()
    cy.get('.SearchResults').should('have.length', 0)
  })

  it('Stops displaying search results when text is cleared from the search input.', function () {
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.Search input').clear().should('have.value', '')
    cy.get('.SearchResult').should('have.length', 0)
  })

  it.skip('Closes the search results when the search input loses focus', function () {})

  it("Navigates to the person's profile when a search result is clicked", function () {
    cy.get('#the-input').type('Si')
    cy.get('.SearchResult').first().click()
    cy.url().should('match', /.+\/person\/\d+/)
  })
})

describe('Creating a publisher profile.', function () {
  describe('Getting to the create person page', function () {
    beforeEach(function () {
      cy.visit('/')
    })

    it('Has options for creating a person in the bottom search result', function () {
      cy.get('#the-input').type('Siob')
      cy.get('li').last().should('have.id', 'create-person')
      cy.get('#create-person').should('have.text', 'Create Siob... or someone else.')
    })

    it('Has a create person link based on the current search query', function () {
      cy.get('#the-input').type('Siob')
      cy.get('#create-suggested-person').click()
      cy.url().should('eq', `${BASE_URL}/person/create?name=Siob`)
    })

    it('Has a create person link for a new person', function () {
      cy.get('#the-input').type('Siob')
      cy.get('#create-new-person').click()
      cy.url().should('eq', `${BASE_URL}/person/create`)
    })
  })

  beforeEach(function () {
    cy.visit('/person/create')
  })

  describe('State on page load', function () {
    it('Focuses the input', function () {
      cy.focused().should('have.id', 'the-input')
    })

    it('Disables the save button', function () {
      cy.get('.save').should('have.attr', 'disabled')
    })

    it("Prompts for the person's name in the input", function () {
      cy.get('#the-input').should('have.attr', 'placeholder', "Enter the person's name")
    })
  })

  describe('Validating URLs', function () {
    it('Disables the input whilst it has an invalid URL', function () {
      cy.get('#the-input').type('Siobhan Wilson')
      cy.get('#add-profile').should('not.have.attr', 'disabled')
      cy.get('#add-profile').click()

      cy.get('#add-profile').should('not.have.attr', 'disabled')
      cy.get('#add-image').should('not.have.attr', 'disabled')
      cy.get('#the-input').type('invalid URL')
      cy.get('#add-profile').should('have.attr', 'disabled')
      cy.get('#add-image').should('have.attr', 'disabled')

      cy.get('#the-input').clear().type('http://example.com')
      cy.get('#add-profile').should('not.have.attr', 'disabled')
      cy.get('#add-image').should('not.have.attr', 'disabled')
    })

    it('Gives the input the invalid style', function () {
      cy.get('#the-input').type('Siobhan Wilson').should('not.have.class', 'invalid')
      cy.get('#add-profile').click()

      cy.get('#the-input').should('not.have.class', 'invalid').type('invalid URL').should('have.class', 'invalid')

      cy.get('#the-input').clear().type('http://example.com').should('not.have.class', 'invalid')
    })
  })

  describe('Adding the first profile URL', function () {
    beforeEach(function () {
      cy.get('#the-input').type('Siobhan Wilson')
      cy.get('.next').click()
    })

    it('Clears the input when the next button is clicked', function () {
      cy.get('#the-input').should('have.value', '')
    })

    it("Prompts for the person's first profile URL", function () {
      cy.get('#the-input').should('have.attr', 'placeholder', "Copy-paste the person's profile URL")
    })

    it('Enables the save button once the first profile URL is added', function () {
      cy.get('.save').should('have.attr', 'disabled')
      cy.get('#the-input').type('https://twitter.com/siobhanisback')
      cy.get('#add-profile').click()
      cy.get('.save').should('not.have.attr', 'disabled')
    })
  })

  describe('Adding more information', function () {
    beforeEach(function () {
      cy.get('#the-input').type('Siobhan Wilson')
      cy.get('.next').click()
      cy.get('#the-input').type('https://twitter.com/siobhanisback')
    })

    it('Enables the save button once the first profile URL is added', function () {
      cy.get('.save').should('not.have.attr', 'disabled')
    })
  })
})

describe('Viewing a publisher profile.', function () {
  beforeEach(function () {
    cy.task('createPerson').then((person) => {
      cy.visit(`/person/${person._id}`)
      cy.get('.name').should('have.text', 'Siobhan Wilson') // TODO: Come up with a better way to wait for render.
    })
  })

  it("Updates the avatar to show the person's profile photo.", function () {
    // TODO: Decide how we are going to create test fixtures.
  })

  it("Shows links to the publisher's profiles", function () {
    cy.get('.profile').should('have.length', 3)
    cy.get('.profile a').first().should('have.attr', 'href').and('eq', 'https://twitter.com/siobhanisback')
    cy.get('.profile a').eq(1).should('have.attr', 'href').and('eq', 'https://www.youtube.com/user/siobhanwilsonmusic')
    cy.get('.profile a').eq(2).should('have.attr', 'href').and('eq', 'https://www.facebook.com/siobhanwilsonmusic')
  })

  it("Masks the publisher's photo to create a circular frame", function () {
    cy.get('.Avatar img').should('have.css', 'border-radius').should('equal', '50%')
  })

  it("Displays a 'return home' button at the bottom of the page", function () {
    cy.get('.HomeLink').should('have.length', 1).click()
    cy.location('pathname').should('eq', '/')
  })
})
