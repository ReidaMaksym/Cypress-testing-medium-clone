/// <reference types="cypress" />

const postDetailsPageLocators = {
    postTitle: '.banner > .container > h1',
    postContent: '.ng-binding > p',
    postedBy: '.container > .ng-isolate-scope > .ng-isolate-scope .author.ng-binding',
    numberOfLikes: '.banner .counter',
    postTags: '.tag-list > li'
}

class postPage {

    checkPostData(){

        cy.getPostData().then(function(postData){
            console.log(postData)

            cy.get(postDetailsPageLocators.postTitle)
                .invoke('text')
                    .should('contains', postData.article.title)
            
            cy.get(postDetailsPageLocators.postContent)
                .invoke('text')
                    .should('contains', postData.article.body)
            
            cy.get(postDetailsPageLocators.postedBy)
                .invoke('text')
                    .should('contains', postData.article.author.username)
            
            cy.get(postDetailsPageLocators.numberOfLikes)
                .invoke('text')
                    .should('contains', postData.article.favoritesCount)

            cy.get(postDetailsPageLocators.postTags).each(function($el, index, $list){
                expect($el.text().trim()).contains(postData.article.tagList[index])
            })
        })

        return this
    }

}

module.exports = new postPage()