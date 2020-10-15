beforeEach(function() {
  cy.task('resetDatabase')
  cy.task('createPersonApi')
    .as('person')
    .then(person => {
      cy.visit(`/person/${person.id}`)
    })
})

it("updates the document title to the person's name", function() {
  cy.title().should('eq', this.person.name)
})

it('has an edit button below the input', function() {
  cy.get('#edit-person')
    .should('have.attr', 'value', 'Edit Daniel Metcalfe')
    .click()
  cy.url().should('match', /\/person\/\w+\/edit/)
})

describe('that has all optional properties', function() {
  it("shows the person's profile image.", function() {
    cy.get('.image').should(
      'have.css',
      'background-image',
      `url("${this.person.image}")`
    )
  })

  it("shows links to the person's profiles", function() {
    cy.get('.profile').should('have.length', 7)
    cy.get('.profile a')
      .first()
      .should('have.attr', 'href')
      .and('eq', this.person.profiles[0])
    cy.get('.profile a')
      .eq(1)
      .should('have.attr', 'href')
      .and('eq', this.person.profiles[1])
    cy.get('.profile a')
      .eq(2)
      .should('have.attr', 'href')
      .and('eq', this.person.profiles[2])
  })

  it("masks the person's image to create a circular frame", function() {
    cy.get('.image').should('have.css', 'clip-path', 'circle(at 50% 50%)')
  })

  it("displays a 'return home' button at the bottom of the page", function() {
    cy.get('#home')
      .should('have.length', 1)
      .click()
    cy.location('pathname').should('eq', '/')
  })
})

describe('that has no profile image', function() {
  beforeEach(function() {
    cy.fixture('people/dan.json')
      .then(dan => {
        delete dan.image
        return cy.task('createPerson', { ...dan, popularity: 2 })
      })
      .then(person => {
        cy.visit(`/person/${person._id}`)
      })
  })

  it('fallsback to the placeholder profile image', function() {
    cy.get('.image')
      .should('have.css', 'background-image')
      .and('contains', 'placeholderPersonImage')
  })
})
