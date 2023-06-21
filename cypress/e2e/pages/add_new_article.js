/// <reference types="cypress" />

const addNewArticlePageLocators = {
    articleTitleInput: '.form-control.form-control-lg',
    articleDescriptionInput: 'fieldset:nth-of-type(2) > .form-control',
    articleMainContentInput: 'fieldset:nth-of-type(3) > .form-control',
    articleTagsInput: 'fieldset:nth-of-type(4) > .form-control'
}

class addNewArticlePage{

    fillInForm({title, description, mainContent}){

        cy.generatePostData().then(function(newPostData){

            if(title && description && mainContent){
                cy.fillInInput(addNewArticlePageLocators.articleTitleInput, newPostData.title)
                cy.fillInInput(addNewArticlePageLocators.articleDescriptionInput, newPostData.description)
                cy.fillInInput(addNewArticlePageLocators.articleMainContentInput, newPostData.mainContent)
            }

        })

        return this
    }

}

module.exports = new addNewArticlePage()