import pathRegexes from '../../../people/src/pathRegexes'

beforeEach(function() {
  cy.visit('/person/create')
})

it("updates the document title, using the 'name' query param if it exists", function() {
  cy.title().should('eq', 'Create person')
  cy.visit('/person/create?name=Siobhan')
  cy.title().should('eq', 'Create Siobhan')
})

it('highlights the property currently being edited', function() {
  cy.get('.edit-name').should('have.class', 'currently-being-edited')
  cy.get('.add-profile').click()
  cy.get('.edit-profile-0').should('have.class', 'currently-being-edited')
})

describe('getting to the create person page', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('has options for creating a person in the bottom search result', function() {
    cy.get('#the-input').type('Siob')
    cy.get('.search-result') // Wait until search results appear to avoid Cypress failing because li with loading message gets detached from the DOM.
    cy.get('li')
      .last()
      .should('have.id', 'create-person')
    cy.get('#create-person').should('have.text', 'Create Siob or someone else.')
  })

  it('has a create person link based on the current search query', function() {
    cy.get('#the-input').type('Siob')
    cy.get('#create-suggested-person').click()
    cy.url().should('contain', `/person/create?name=Siob`)
  })

  it('has a create person link for a new person', function() {
    cy.get('#the-input').type('Siob')
    cy.get('#create-new-person').click()
    cy.url().should('contain', `/person/create`)
  })
})

describe('state on page load', function() {
  it('focuses the input', function() {
    cy.focused().should('have.id', 'the-input')
  })

  it('disables the save button', function() {
    cy.get('.save').should('have.attr', 'disabled')
  })

  it("prompts for the person's name in the input", function() {
    cy.get('#the-input').should(
      'have.attr',
      'placeholder',
      "Enter the person's name"
    )
  })

  it('has an add property buttons in the same order as they appear on the person', function() {
    cy.get('.next')
      .eq(0)
      .should('have.class', 'edit-name')
    cy.get('.next')
      .eq(1)
      .should('have.class', 'add-image')
    cy.get('.next')
      .eq(2)
      .should('have.class', 'add-profile')
  })
})

describe('adding the first profile URL', function() {
  beforeEach(function() {
    cy.get('#the-input').type('Siobhan Wilson')
    cy.get('.add-profile').click()
  })

  it('clears the input when the next button is clicked', function() {
    cy.get('#the-input').should('have.value', '')
  })

  it('should have add and edit property buttons in the same order as they appear on the person', function() {
    cy.get('.next')
      .eq(0)
      .should('have.class', 'edit-name')
    cy.get('.next')
      .eq(1)
      .should('have.class', 'add-image')
    cy.get('.next')
      .eq(2)
      .should('have.class', 'edit-profiles')
    cy.get('.next')
      .eq(3)
      .should('have.class', 'add-profile')
  })

  it("prompts for the person's first profile URL", function() {
    cy.get('#the-input').should(
      'have.attr',
      'placeholder',
      "Copy-paste the person's profile URL"
    )
  })

  it('enables the save button once the first profile URL is added', function() {
    cy.get('.save').should('have.attr', 'disabled')
    cy.get('#the-input').type('https://twitter.com/siobhanisback')
    cy.get('.add-profile').click()
    cy.get('.save').should('not.have.attr', 'disabled')
  })
})

describe('adding more information', function() {
  beforeEach(function() {
    cy.get('#the-input').type('Siobhan Wilson')
    cy.get('.add-profile').click()
    cy.get('#the-input').type('https://twitter.com/siobhanisback')
  })

  it('allows a second profile URL and image to be added', function() {
    cy.get('.add-profile').click()
    cy.get('#the-input').type('https://www.youtube.com/user/siobhanwilsonmusic')
    cy.get('.profile')
      .eq('1')
      .find('a')
      .should(
        'have.attr',
        'href',
        'https://www.youtube.com/user/siobhanwilsonmusic'
      )

    cy.get('.add-image').click()
    cy.get('#the-input').type(
      'https://pbs.twimg.com/profile_images/1102783358973677569/qEt61Ej8_400x400.jpg'
    )
    cy.get('.person img').should(
      'have.attr',
      'src',
      'https://pbs.twimg.com/profile_images/1102783358973677569/qEt61Ej8_400x400.jpg'
    )
  })

  it('discards blank profiles or images currently being edited when the user decides to edit something else', function() {
    cy.get('.add-profile').click()
    // Leave input blank
    cy.get('.profile').should('have.length', 2)
    cy.get('.add-image').click()
    cy.get('.profile').should('have.length', 1)
    // Leave input blank
    cy.get('.person img')
      .should('have.attr', 'src')
      .and('match', /\/static\/media\/placeholderPersonImage..*.svg/)
  })
})

describe('editing properties that have already been created', function() {
  beforeEach(function() {
    cy.fixture('siobhan.json')
      .as('siobhan')
      .then(siobhan => {
        cy.get('#the-input').type(siobhan.name)
        cy.get('.add-profile').click()
        cy.get('#the-input').type(siobhan.profiles[0])
        cy.get('.add-profile').click()
        cy.get('#the-input').type(siobhan.profiles[1])
        cy.get('.add-profile').click()
        cy.get('#the-input').type(siobhan.profiles[2])
        cy.get('.add-image').click()
      })
  })

  describe('editing profiles that have already been created', function() {
    it('has an edit profiles button that prompts for the profile number to edit', function() {
      cy.get('.edit-profile-0').should('not.exist')
      cy.get('.edit-profile-1').should('not.exist')
      cy.get('.edit-profile-2').should('not.exist')

      cy.get('.edit-profiles').click()

      cy.get('.edit-profile-0')
      cy.get('.edit-profile-1')
      cy.get('.edit-profile-2')
    })
  })
})

describe('saving the person', function() {
  beforeEach(function() {
    cy.fixture('siobhan.json')
      .as('siobhan')
      .then(siobhan => {
        cy.get('#the-input').type(siobhan.name)
        cy.get('.add-profile').click()
        cy.get('#the-input').type(siobhan.profiles[0])
        cy.get('.add-image').click()
        cy.get('#the-input').type(siobhan.image)
        cy.get('.add-profile').click()
        cy.get('#the-input').type(siobhan.profiles[1])
      })
  })

  it('views the person after a successful save', function() {
    cy.get('.save').click()

    cy.url().should('match', pathRegexes.person)
    cy.get('.profile').should('have.length', 2)
    cy.get('.person img')
      .should('have.attr', 'src')
      .and('eq', this.siobhan.image)
  })

  describe('blank profile being edited', function() {
    it('discards the blank profile before saving', function() {
      cy.get('.add-profile').click()
      cy.get('.save').click()

      cy.url().should('match', pathRegexes.person)
      cy.get('.profile').should('have.length', 2)
      cy.get('.person img')
        .should('have.attr', 'src')
        .and('eq', this.siobhan.image)
    })
  })
})

describe('validating URLs', function() {
  it('gives the input the invalid style', function() {
    cy.get('#the-input')
      .type('Siobhan Wilson')
      .should('not.have.class', 'invalid')
    cy.get('.add-profile').click()

    cy.get('#the-input')
      .should('not.have.class', 'invalid')
      .type('invalid URL')
      .should('have.class', 'invalid')

    cy.get('#the-input')
      .clear()
      .type('http://example.com')
      .should('not.have.class', 'invalid')
  })
})
