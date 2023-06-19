/// <reference types="cypress" />

const mainPageLocators = {
    postsList: 'article-preview > .article-preview',
    postedBy: '.info > a',
    postFavoritesCount: '.ng-isolate-scope  ng-transclude > .ng-isolate-scope.ng-scope.pull-xs-right > .btn.btn-outline-primary.btn-sm > ng-transclude > .ng-binding.ng-scope',
    postTitle: '.preview-link > h1',
    postDescription: '.preview-link > p',
    postTags: '.preview-link > .tag-list > li',
    pagination: 'nav > .pagination > li',
    popularTags: '.sidebar > .tag-list > a',
    signUpPage: "[href='\#\/register']",
    signInPage: "[href='\#\/login']"
}

class mainPage{

    visitMainPage(){

        cy.visit('https://demo.realworld.io/#/')

        return this
    }
    

    checkGlobalFeed(){

        cy.getGlobalFeed().then(function(body){
            console.log('-------')
            console.log(body)

            cy.get(mainPageLocators.postsList).each(function($el, index, $list){

                cy.get($el.find(mainPageLocators.postedBy))
                    .invoke('text')
                        .should('contains', body.articles[index].author.username)

                cy.get($el.find(mainPageLocators.postFavoritesCount))
                    .invoke('text')
                        .should('contains', body.articles[index].favoritesCount)

                cy.get($el.find(mainPageLocators.postTitle))
                    .invoke('text')
                        .should('contains', body.articles[index].title)

                cy.get($el.find(mainPageLocators.postDescription))
                    .invoke('text')
                        .should('contains', body.articles[index].description)
                
                cy.get($el.find(mainPageLocators.postTags)).each(function($el2, index2, $list2){

                    expect($el2.text().trim())
                        .contains(body.articles[index].tagList[index2])
                
                })
            })
        })

        return this
    }

    pagination(pageIndex){
        cy.get(mainPageLocators.pagination).each(function($el, index, $list){
            if(pageIndex - 1 === index){
                console.log(index)
                cy.get($el.find('a')).click()
            }
        })

        return this
    }

    checkPopularTags(){
        cy.getPopularTags().then(function(tags){
            console.log(tags)
            cy.get(mainPageLocators.popularTags).each(function($el, index, $list){
                cy.get($el)
                    .invoke('text')
                        .should('contains', tags[index])
            })

        })
        
        return this
    }

    openPost(postIndex){

        cy.getGlobalFeed().then(function(feed){
            cy.get(mainPageLocators.postTitle).each(function($el, index, $list){
                if(postIndex - 1 === index){
                    console.log(feed.articles[index].slug)
                    cy.wrap(feed.articles[index].slug).as('slug')
                    cy.get($el).click()
                }
            })
        })

        return this
    }

    openSingUpPage(){

        cy.get(mainPageLocators.signUpPage)
            .click()

        return this
    }

    openSignInPage(){

        cy.get(mainPageLocators.signInPage)
            .click()
        
        return this

    }

}

module.exports = new mainPage()