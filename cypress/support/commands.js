// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', { prevSubject: 'optional' }, subject => {
  if (subject) {
    cy.wrap(subject)
      .as('user')
      .then(user => {
        cy.task('createUser', user)
      })
      .then(user => cy.task('createSession', { userId: user._id }))
      .then(signed => {
        cy.setCookie('isLoggedIn', 'true')
        cy.setCookie('connect.sid', signed)
      })
    cy.get('@user')
  } else {
    cy.fixture('users/dan.json')
      .then(dan => {
        cy.task('createUser', dan)
      })
      .as('dan')
      .then(dan => cy.task('createSession', { userId: dan._id }))
      .then(signed => {
        cy.setCookie('isLoggedIn', 'true')
        cy.setCookie('connect.sid', signed)
      })
    cy.get('@dan')
  }
})
