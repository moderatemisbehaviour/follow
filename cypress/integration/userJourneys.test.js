const BASE_URL = Cypress.config('baseUrl')

describe('User journeys', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  describe('Create a new person then search for them', function () {
    it('Happy path with mouse', () => {
      cy.log('A create person button is displayed at the bottom of the search results')
      cy.get('.the-input').type('Si').get('.CreatePersonButton')

      // Placeholder photo is displayed
      // Placeholder profile is displayed

      cy.log('Clicking the create person button navigates to the create person page')
      cy.get('.CreatePersonButton').click()
      cy.url().should('eq', `${BASE_URL}/person/create`)

      cy.log('The input is focused')
      cy.focused().should('have.class', 'the-input')

      cy.log('The save button is disabled')
      cy.get('.save').should('have.attr', 'disabled')

      cy.log("The input prompts for the person's name")
      cy.get('.the-input').should('have.attr', 'placeholder', "Enter the person's name")

      cy.log('Name of person becomes highlighted')
      cy.get('.PeopleCreator').should('have.class', 'editing-name')

      cy.log('Typing in the input is allowed')
      cy.get('.the-input').type('Siobhan Wilson')

      cy.log('Clicking the next button clears the input')
      cy.get('.next').click()
      cy.get('.the-input').should('have.value', '')

      cy.log("The input prompts for the peron's first profile URL")
      cy.get('.the-input').should('have.attr', 'placeholder', "Enter the person's profiles")

      cy.log('The first profile becomes highlighted')
      cy.get('.PeopleCreator').should('have.class', 'editing-profiles')
      cy.get('.Profile').eq(0).should('not.have.class', 'editing-name')

      cy.log('The input is focused')
      cy.focused().should('have.class', 'the-input')

      cy.log('Typing in the input is allowed')
      cy.get('.the-input').type('https://twitter.com/siobhanisback')

      cy.log('Clicking the next button clears the input')
      cy.get('.next').click()
      cy.get('.the-input').should('have.value', '')

      cy.log('The save button becomes enabled')
      cy.get('.save').should('not.have.attr', 'disabled')

      cy.log("The input prompts for the peron's second profile URL")
      cy.get('.the-input').should('have.attr', 'placeholder', "Enter the person's profiles")

      cy.log('The second profile becomes highlighted')
      cy.get('.PeopleCreator').should('have.class', 'editing-profiles')

      cy.log('The input is focused')
      cy.focused().should('have.class', 'the-input')

      cy.log('Typing in the input is allowed')
      cy.get('.the-input').type('https://www.youtube.com/user/siobhanwilsonmusic')

      cy.log('Clicking the next button clears the input')
      cy.get('.next').click()
      cy.get('.the-input').should('have.value', '')

      cy.log("The input prompts for the peron's third profile URL")
      cy.get('.the-input').should('have.attr', 'placeholder', "Enter the person's profiles")

      cy.log('The third profile becomes highlighted')
      cy.get('.PeopleCreator').should('have.class', 'editing-profiles')

      cy.log('The input is focused')
      cy.focused().should('have.class', 'the-input')

      cy.log('Typing in the input is allowed')
      cy.get('.the-input').type('https://www.facebook.com/siobhanwilsonmusic')

      cy.log('Clicking the next button clears the input')
      cy.get('.next').click()
      cy.get('.the-input').should('have.value', '')

      cy.log('Clicking the save button views the newly created person')
      cy.url().should('match', /person\/create/)
      cy.log("The person's name is displayed")
      cy.get('.name').should('have.text', 'Siobhan Wilson')
    })

    it('Happy path with keyboard', () => {

    })
  })
})
