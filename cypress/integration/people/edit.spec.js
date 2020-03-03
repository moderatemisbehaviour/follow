import pathRegexes from '../../../people/src/pathRegexes'

beforeEach(function() {
  cy.task('resetDatabase')
  cy.task('createPersonApi')
    .as('person')
    .then(person => {
      cy.visit(`/person/${person.id}/edit`)
    })
})

it("updates the document title using the person's name", function() {
  cy.title().should('eq', `Edit ${this.person.name}`)
})

describe('the state on page load', function() {
  it('displays the person in their current state', function() {
    cy.get('.name').should('have.text', this.person.name)
    cy.get('.image img').should('have.attr', 'src', this.person.image)
    cy.get('.profile-0 a').should('have.attr', 'href', this.person.profiles[0])
    cy.get('.profile-1 a').should('have.attr', 'href', this.person.profiles[1])
    cy.get('.profile-2 a').should('have.attr', 'href', this.person.profiles[2])
  })

  it('has edit buttons for existing properties', function() {
    cy.get('.edit-name')
    cy.get('.edit-image')
    cy.get('.edit-profiles')
    cy.get('.next').should('have.length', 4) // Including add profile button.
  })

  it('disables the edit button for the property currently being edited', function() {
    cy.get('.edit-image').should('have.attr', 'disabled')
    cy.get('.edit-profiles')
      .click()
      .should('have.attr', 'disabled')
  })

  it('has an add profile button', function() {
    cy.get('.add-profile')
  })

  it('has a save button', function() {
    cy.get('.save')
  })

  it('starts by editing the profile image because this would be common', function() {
    cy.get('#the-input').should('have.attr', 'value', this.person.image)
  })
})

describe('editing properties and saving', function() {
  describe('editing name and existing profiles', function() {
    it('views the updated person after saving', function() {
      const newName = 'Siobhan Wilson 2.0'
      const newTwitterProfileUrl = 'https://twitter.com/siobhansnewprofile'

      cy.get('.edit-name').click()
      cy.get('#the-input')
        .clear()
        .type(newName)

      cy.get('.edit-profiles').click()
      cy.get('.edit-profile-0').click()
      cy.get('#the-input')
        .clear()
        .type(newTwitterProfileUrl)
      cy.get('.save').click()

      cy.url().should('match', pathRegexes.person)

      cy.get('.name').should('have.text', newName)
      cy.get('.image img').should('have.attr', 'src', this.person.image)
      cy.get('.profile-0 a').should('have.attr', 'href', newTwitterProfileUrl)
      cy.get('.profile-1 a').should(
        'have.attr',
        'href',
        this.person.profiles[1]
      )
      cy.get('.profile-2 a').should(
        'have.attr',
        'href',
        this.person.profiles[2]
      )
      cy.get('.profile-3 a').should('not.exist')
    })
  })

  describe('adding profiles', function() {
    describe('when a blank profile is being edited', function() {
      it('discards the blank profile before saving', function() {
        cy.get('.add-profile').click()
        cy.get('.save').click()

        cy.url().should('match', pathRegexes.person)
        cy.get('.profile').should('have.length', 3)
      })
    })

    describe('adding a blank profile then editing another one', function() {
      it('discards the blank profile before saving', function() {
        cy.get('.add-profile').click()
        cy.get('.edit-profile-2').click()

        cy.get('.save').click()
        cy.url().should('match', pathRegexes.person)
        cy.get('.profile').should('have.length', 3)
      })
    })

    describe('adding a blank profile then attempting to add another one', function() {
      it('does not allow another profile to be added whilst one is invalid', function() {
        cy.get('.add-profile').click()
        cy.get('.add-profile').should('have.attr', 'disabled')
        cy.get('#the-input').type('invalid profile URL')
        cy.get('.add-profile').should('have.attr', 'disabled')
        cy.get('#the-input')
          .clear()
          .type('https://google.com')

        cy.get('.save').click()
        cy.url().should('match', pathRegexes.person)
        cy.get('.profile').should('have.length', 4)
      })
    })
  })
})
