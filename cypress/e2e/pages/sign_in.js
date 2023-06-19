/// <reference types="cypress" />

const signInPageLocators = {
    userEmailInput: "[type='email']",
    userPasswordInput: "[type='password']",
    signInButton: '.btn',
    errorMessage: '.ng-binding.ng-scope'
}

class signInPage{

    fillInform({email, password}){

        cy.readFile('cypress/fixtures/userData.json').then(function(userData){

            if(email && password){

                cy.fillInInput(signInPageLocators.userEmailInput, userData.email)
                cy.fillInInput(signInPageLocators.userPasswordInput, userData.password)
    
            }
            else if(email && !password){
                cy.fillInInput(signInPageLocators.userEmailInput, userData.email)
            }
            else if(!email && password){
                cy.fillInInput(signInPageLocators.userPasswordInput, userData.password)
            }

        })

        return this

    }

    signInButtonClick(){

        cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('logIn')

        cy.get(signInPageLocators.signInButton)
            .click()

        cy.wait('@logIn')

        cy.get('@logIn').then(function(logIn){
            
            if(logIn.response.statusCode !== 200){

                const {response: {
                    body: {
                        errors
                    }
                }} = logIn
 
                console.log(errors)

                if('password' in errors){
                    cy.get(signInPageLocators.errorMessage)
                        .invoke('text')
                            .should('contains', "password can't be blank")
                }
                else if('email' in errors){
                    cy.get(signInPageLocators.errorMessage)
                        .invoke('text')
                            .should('contains', "email can't be blank")
                }
                else if('email or password' in errors){
                    cy.get(signInPageLocators.errorMessage)
                        .invoke('text')
                            .should('contains', "email or password is invalid")
                }
            }
            else{
                expect(logIn.response.statusCode).eq(200)
            }
        })
        
        return this
    }

}

module.exports = new signInPage()