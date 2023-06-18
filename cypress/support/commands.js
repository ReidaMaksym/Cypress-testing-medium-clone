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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getGlobalFeed', function(){

    cy.intercept('GET', '**/api.realworld.io/api/articles?limit=10&**').as('globalFeed')

    cy.wait('@globalFeed')

    cy.get('@globalFeed').then(function(feed){
        console.log(feed)

        const {response: {
            body
        }} = feed

        return cy.wrap(body)
    })

})

Cypress.Commands.add('getPopularTags', function(){

    cy.intercept('GET', 'https://api.realworld.io/api/tags').as('popularTags')

    cy.wait('@popularTags')

    cy.get('@popularTags').then(function(returnedTags){

        const {response: {
            body: {
                tags
            }
        }} = returnedTags

        return cy.wrap(tags)

    })

})

Cypress.Commands.add('getPostData', function(){

    cy.get('@slug').then(function(slug){
        cy.intercept('GET', `https://api.realworld.io/api/articles/${slug}`).as('postDetails')

        cy.intercept('GET', `https://api.realworld.io/api/articles/${slug}/comments`).as('postComments')
    
        cy.wait('@postDetails')
    
        cy.wait('@postComments')
    
        cy.get('@postDetails').then(function(postDetails){
            // console.log(postDetails)
            const {response: {
                body: {
                    article
                }
            }} = postDetails

            cy.get('@postComments').then(function(postComments){
                // console.log(postComments)
                const {response: {
                    body: {
                        comments
                    }
                }} = postComments

                return cy.wrap({
                    article: article,
                    comments: comments
                })

            })


        })
    
    })
    

})

Cypress.Commands.add('fillInInput', function(inputLocator, valueToEnter = ''){
    cy.get(inputLocator)
        .click()
        .clear()
        .type(valueToEnter)
})

Cypress.Commands.add('generateSignUpData', function(){

    const today = new Date()
    const time = today.getTime()

    const userEmail = `test${time}@mail.com`
    const userName = `Maksym${time}`
    const userPassword = time

    cy.writeFile('cypress/fixtures/userData.json', {email: userEmail, name: userName, password: JSON.stringify(userPassword)})

    return cy.wrap({
        email: userEmail,
        name: userName,
        password: userPassword
    })

})