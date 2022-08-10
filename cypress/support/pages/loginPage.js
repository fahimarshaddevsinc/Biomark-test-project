/// <reference types="cypress" />

export class loginPage {

  //Locators
  elements = {
    //Login form
    email_field:() => cy.get('input[name="userName"]').as('email-field'),
    password_field:() => cy.get('input[name="password"]').as('password-field'),
    login_button:() => cy.get('button[type="button"]').as('login-button'),
    error_message:() => cy.get('.Toastify__toast-body > div').as('error-message'),
  }

  //Get Functions


  //Set Functions
  enter_in_email_field(username) {
    this.elements.email_field().type(username)
  }

  enter_in_password_field(password) {
    this.elements.password_field().type(password)
  }

  click_on_login_button() {
    this.elements.login_button().click()
  }

  //Test Functions
  verify_field_visiblity() {
    this.elements.email_field().should('be.visible')
    this.elements.password_field().should('be.visible')
    this.elements.login_button().should('be.visible')
  }

  enter_credentials(username, password) {
    this.enter_in_email_field(username)
    this.enter_in_password_field(password)
  }

  verify_password_field_is_masked() {
    this.elements.password_field().then( field => {
      cy.wrap(field).invoke('prop', 'type').should('contain','password')
  })
  }

  verify_error_message() {
    this.elements.error_message().should('have.text', 'Invalid Email or password.')
  }

}

export const onLoginPage = new loginPage()
