/// <reference types="cypress" />

const signUpPageLocators = {
    userNameInput: 'fieldset:nth-of-type(1) > .form-control',
    emailInput: 'fieldset:nth-of-type(2) > .form-control',
    passwordInput: 'fieldset:nth-of-type(3) > .form-control',
    signUpButton: '.btn.btn-lg'
}

class signUpPage{

    submitForm(){

        cy.get(signUpPageLocators.signUpButton).click()

        cy.intercept('POST', 'https://api.realworld.io/api/users').as('createdUser')

        cy.wait('@createdUser')

        cy.get('@createdUser').then(function(createdUser){

            console.log(createdUser)

            const {response: {
                body: {
                    user
                }
            }} = createdUser

            cy.writeFile('cypress/fixtures/token.json', {token: user.token})

            cy.getAllLocalStorage().then(function(storageData){
                console.log(storageData)
                console.log(storageData.jwtToken)
            })

        })


    }

    fillInForm({userName, email, password}){

        cy.generateSignUpData().then(function(newUserData){

            if(userName && email && password){
                cy.fillInInput(signUpPageLocators.userNameInput, newUserData.name)

                cy.fillInInput(signUpPageLocators.emailInput, newUserData.email)

                cy.fillInInput(signUpPageLocators.passwordInput, newUserData.password)
            }

        })

        return this

    }

}

module.exports = new signUpPage()