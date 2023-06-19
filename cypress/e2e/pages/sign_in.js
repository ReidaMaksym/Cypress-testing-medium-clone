/// <reference types="cypress" />

const signInPageLocators = {
    userEmailInput: "[type='email']",
    userPasswordInput: "[type='password']",
    signInButton: '.btn'
}

class signInPage{

    fillInform({email, password}){

        cy.readFile('cypress/fixtures/userData.json').then(function(userData){

            if(email && password){

                cy.fillInInput(signInPageLocators.userEmailInput, userData.email)
                cy.fillInInput(signInPageLocators.userPasswordInput, userData.password)
    
            }

        })

        return this

    }

    signInButtonClick(){
        cy.get(signInPageLocators.signInButton)
            .click()
        
        return this
    }

}

module.exports = new signInPage()