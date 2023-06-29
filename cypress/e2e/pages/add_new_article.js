/// <reference types="cypress" />

const addNewArticlePageLocators = {
    articleTitleInput: '.form-control.form-control-lg',
    articleDescriptionInput: 'fieldset:nth-of-type(2) > .form-control',
    articleMainContentInput: 'fieldset:nth-of-type(3) > .form-control',
    articleTagsInput: 'fieldset:nth-of-type(4) > .form-control',
    publishArticleButton: '.btn.btn-lg',
    errorMessage: '.ng-binding.ng-scope',
    commentInput: 'textarea',
    postCommentButton: '.btn.btn-primary.btn-sm',
    deleteCommentButtons: 'comment .mod-options > .ion-trash-a'
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

    addCommentToArticle(){

        // cy.intercept('GET', 'https://api.realworld.io/api/articles/**').as('article')

        // cy.wait('@article')

        cy.wait(2000)

        cy.generateCommentForPost().then(function(newComment){

            cy.fillInInput(addNewArticlePageLocators.commentInput, newComment)

        })
        return this
    }

    postNewComment(){
        cy.get(addNewArticlePageLocators.postCommentButton).click().then(function(){

            cy.intercept('POST', 'https://api.realworld.io/api/articles/**/comments').as('newComment')

            cy.wait('@newComment')

            cy.get('@newComment').then(function(newComment){
                console.log(newComment)
            })
        })

        return this
    }

    deleteComment({deleteAllComments, commentIndex}){

        cy.reload()

        cy.intercept('GET', 'https://api.realworld.io/api/articles/**/comments').as('commentsList')

        cy.intercept('DELETE', 'https://api.realworld.io/api/articles/**/comments/**').as('deleteComment')

        cy.wait('@commentsList')

        cy.get('@commentsList').then(function(commentsList){
            console.log(commentsList)
            const {
                response: {
                    body: {
                        comments
                    }
                }
            } = commentsList

            if(comments.length !== 0){

                if(deleteAllComments && commentIndex < 0){
                    cy.get(addNewArticlePageLocators.deleteCommentButtons).each(function($el, index, $list){
                        cy.get($el).click()
                        cy.wait('@deleteComment')
                    })
                }
                else if(!deleteAllComments && commentIndex >= 0){
                        cy.get(addNewArticlePageLocators.deleteCommentButtons).each(function($el, index, $list){
                        
                        if(commentIndex === index){
                            cy.get($el).click()
                            cy.wait('@deleteComment')
                        } 
                        
                        
                    })
                }

            }
        })


        return this
    }

}

module.exports = new addNewArticlePage()