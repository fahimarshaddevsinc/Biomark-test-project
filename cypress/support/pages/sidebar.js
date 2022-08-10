/// <reference types="cypress" />



export class sidebar {

  //Locators
  elements = {
    sidebar:() => cy.get('.jss14').as('sidebar'),
    dashboard_header:() => cy.get('span').contains('Dashboard').as('dashboard-header'),
    accounts:() => cy.get('span').contains('Accounts').as('accounts-page')
  }

  //Set Functions


  //Get Functions
  navigate_to_account_page() {
    cy.url().should('equal', 'https://qalab-id.biomarking.com/')
    this.elements.accounts().click();
  }

  //Test Functions
  validate_sidebar_is_visible() {
    this.elements.sidebar().should('be.visible')
  }

  validate_dashboard_header() {
    this.elements.dashboard_header().should('be.visible')
  }


}

export const onSidebar = new sidebar()
