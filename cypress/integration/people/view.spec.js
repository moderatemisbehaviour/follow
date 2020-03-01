beforeEach(function() {
  cy.task('resetDatabase')
  cy.task('createPerson')
    .as('person')
    .then(person => {
      cy.visit(`/person/${person._id}`)
    })
})

it("updates the document title to the person's name", function() {
  cy.title().should('eq', this.person.name)
})

it('has an edit button below the input', function() {
  cy.get('#edit-person')
    .should('have.attr', 'value', 'Edit Siobhan Wilson')
    .click()
  cy.url().should('match', /\/person\/\w+\/edit/)
})

describe('that has all optional properties', function() {
  it("shows the person's profile image.", function() {
    cy.get('.image img')
      .should('have.attr', 'src')
      .and('eq', this.person.image)
  })

  it("shows links to the person's profiles", function() {
    cy.get('.profile').should('have.length', 3)
    cy.get('.profile a')
      .first()
      .should('have.attr', 'href')
      .and('eq', 'https://twitter.com/siobhanisback')
    cy.get('.profile a')
      .eq(1)
      .should('have.attr', 'href')
      .and('eq', 'https://www.youtube.com/user/siobhanwilsonmusic')
    cy.get('.profile a')
      .eq(2)
      .should('have.attr', 'href')
      .and('eq', 'https://www.facebook.com/siobhanwilsonmusic')
  })

  it("masks the person's image to create a circular frame", function() {
    cy.get('.image img')
      .should('have.css', 'border-radius')
      .should('equal', '50%')
  })

  it("displays a 'return home' button at the bottom of the page", function() {
    cy.get('.HomeLink')
      .should('have.length', 1)
      .click()
    cy.location('pathname').should('eq', '/')
  })
})

describe('that has no profile image', function() {
  beforeEach(function() {
    cy.fixture('siobhan.json')
      .then(siobhan => {
        delete siobhan.image
        return cy.task('createPerson', { ...siobhan, popularity: 2 })
      })
      .then(person => {
        cy.visit(`/person/${person._id}`)
      })
  })

  it('fallsback to the placeholder profile image', function() {
    cy.get('.image img')
      .should('have.attr', 'src')
      .and('contains', 'placeholderPersonImage')
  })
})
