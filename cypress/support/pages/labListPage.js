

/// <reference types="cypress" />

export class labListPage {

  //Locators
  elements = {
    lab_list_header:() => cy.get('h5').contains('Lab List').as('lab-list-page-header'),
    dropdown:() => cy.get('div').contains('All').as('dropdown')
  }

  //Set Functions


  //Get Functions


  //Test Functions
  verify_lab_list_page_is_loaded() {
    cy.url().should('contain', '/lab/lab-list')
    this.elements.lab_list_header().should('be.visible')
    this.elements.dropdown().should('be.visible')
  }

  verify_branch_filter_dropdown() {
    cy.wait(1000)
    this.elements.dropdown().click().then( dropdown => {
      cy.wrap(dropdown)
        //verify drop down is clicked by invoking its properties and checking that dropdown is expanded
        .invoke('prop', 'ariaExpanded').should('equal','true')
        cy.wrap(dropdown).get('li').each( options => {

          const dropdownOptions = options.text()
          // console.log(options)
          // console.log(dropdownOptions)
          cy.wrap(options).should('be.visible').click({force:true})
          cy.wait(1000)
          cy.wrap(dropdown)
          .should('contain', dropdownOptions)
          cy.wrap(dropdown).click()
          cy.wait(5000)
        })
      cy.wrap(dropdown).click()
    })
  }

}

export const onLabListPage = new labListPage()

