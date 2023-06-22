/// <reference types="cypress" />

const addNewArticlePageLocators = {
    articleTitleInput: '.form-control.form-control-lg',
    articleDescriptionInput: 'fieldset:nth-of-type(2) > .form-control',
    articleMainContentInput: 'fieldset:nth-of-type(3) > .form-control',
    articleTagsInput: 'fieldset:nth-of-type(4) > .form-control',
    publishArticleButton: '.btn.btn-lg',
    errorMessage: '.ng-binding.ng-scope'
}

class addNewArticlePage{

    fillInForm({title, description, mainContent}){

        cy.generatePostData().then(function(newPostData){

            if(title && description && mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleTitleInput, newPostData.title)
                cy.fillInInput(addNewArticlePageLocators.articleDescriptionInput, newPostData.description)
                cy.fillInInput(addNewArticlePageLocators.articleMainContentInput, newPostData.mainContent)
            }
            else if(!title && description && mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleDescriptionInput, newPostData.description)
                cy.fillInInput(addNewArticlePageLocators.articleMainContentInput, newPostData.mainContent)
            }
            else if(title && !description && mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleTitleInput, newPostData.title)
                cy.fillInInput(addNewArticlePageLocators.articleMainContentInput, newPostData.mainContent)
            }
            else if(title && description && !mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleTitleInput, newPostData.title)
                cy.fillInInput(addNewArticlePageLocators.articleDescriptionInput, newPostData.description)
            }
            else if(!title && !description && !mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleTitleInput)
                cy.fillInInput(addNewArticlePageLocators.articleDescriptionInput)
                cy.fillInInput(addNewArticlePageLocators.articleMainContentInput)
            }

        })

        return this
    }

    createNewArticle(){
        cy.get(addNewArticlePageLocators.publishArticleButton).click().then(function(){
            cy.intercept('POST', 'https://api.realworld.io/api/articles').as('newArticle')

            cy.wait('@newArticle')

            cy.get('@newArticle').then(function(newArticle){
                console.log(newArticle)

                const {response: {
                    body
                }} = newArticle

                if(newArticle.response.statusCode !== 200){
                    console.log(body)
                    if('title' in body.errors){
                        cy.get(addNewArticlePageLocators.errorMessage)
                            .invoke('text')
                                .should('contains', "title can't be blank")
                    }
                    else if('description' in body.errors){
                        cy.get(addNewArticlePageLocators.errorMessage)
                            .invoke('text')
                                .should('contains', "description can't be blank")
                    }
                    else if('body' in body.errors){
                        cy.get(addNewArticlePageLocators.errorMessage)
                            .invoke('text')
                                .should('contains', "body can't be blank")
                    }
                }
                else{
                    console.log(body)
                    expect(newArticle.response.statusCode).eq(200)
                }

            })

        })
        return this
    }

}

module.exports = new addNewArticlePage()