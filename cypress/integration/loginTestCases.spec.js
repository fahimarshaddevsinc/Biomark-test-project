/// <reference types="cypress" />

import { onLoginPage } from '../support/pages/loginPage.js'
import { onSidebar } from '../support/pages/sidebar.js'
import { onLabListPage } from '../support/pages/labListPage'

describe("Login Specs", () => {

  beforeEach(() => {
    cy.visit("/")

    onLoginPage.verify_field_visiblity()
  })

  it("Validate successful login", () => {
    onLoginPage.enter_credentials(Cypress.env('username'), Cypress.env('password'))
    onLoginPage.verify_password_field_is_masked()
    onLoginPage.click_on_login_button()

    cy.intercept ({ method: 'POST', path: '**/login',}).as('login')
    cy.wait('@login')
    cy.get('@login').its('response.statusCode').should('eq', 200)

    onSidebar.validate_dashboard_header()
  })

  it("Validate unsuccessful login", () => {
    let username = "biomarkt@gmail.com"
    let password = "BioTest123"

    onLoginPage.enter_credentials(username, password)
    onLoginPage.verify_password_field_is_masked()
    onLoginPage.click_on_login_button()

    cy.intercept ({ method: 'POST', path: '**/login',}).as('login')
    cy.wait('@login')
    cy.get('@login').its('response').then(response => {
      expect(response.statusCode, 'Status code').to.equal(401)
      expect(response.body, 'Reponse body').to.equal('Invalid Email or password.')
    })

    onLoginPage.verify_error_message()
  })
})

describe.only("Post Login Specs", () => {

  before(() => {
    cy.visit("/")

    onLoginPage.verify_field_visiblity()
    onLoginPage.enter_credentials(Cypress.env('username'), Cypress.env('password'))
    onLoginPage.verify_password_field_is_masked()
    onLoginPage.click_on_login_button()
})

  it("Validate that the Dashboard page has been properly loaded", () => {

    onSidebar.validate_sidebar_is_visible()
    onSidebar.validate_dashboard_header()
  })

  it("Verify that the labs list is opened when redirected to the Labs page from Accounts", () => {

    onSidebar.validate_sidebar_is_visible()
    onSidebar.validate_dashboard_header()
    onSidebar.navigate_to_account_page()
    onLabListPage.verify_lab_list_page_is_loaded()
  })

  it("Verify that the branch filter is working on lab list page", () => {

    onLabListPage.verify_lab_list_page_is_loaded()
    onLabListPage.verify_branch_filter_dropdown()
  })
})

