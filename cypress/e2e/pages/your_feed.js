/// <reference types="cypress" />
import mainPage from "../pages/main_page";
import postPage from "../pages/post_page";

const yourFeedPageLocators = {
    noArticles: "[ng-show='\!\$ctrl\.loading \&\& \!\$ctrl\.list\.length']",
    globalFeed: ".nav.nav-pills > li:nth-of-type(2) > .nav-link",
    yourFeed: ".nav.nav-pills > li:nth-of-type(1) > .nav-link",
    subscribeButton: '.banner follow-btn button',
    homeButton: "ul:nth-of-type(2) > li:nth-of-type(1) > .nav-link",

    postsList: 'article-preview > .article-preview',
    postedBy: '.info > a',
    postFavoritesCount: '.ng-isolate-scope  ng-transclude > .ng-isolate-scope.ng-scope.pull-xs-right > .btn.btn-outline-primary.btn-sm > ng-transclude > .ng-binding.ng-scope',
    postTitle: '.preview-link > h1',
    postDescription: '.preview-link > p',
    postTags: '.preview-link > .tag-list > li',
    pagination: 'nav > .pagination > li',
    popularTags: '.sidebar > .tag-list > a',
}

class yourFeedPage{

    checkYourFeed(){
        cy.intercept('GET', 'https://api.realworld.io/api/articles/feed?limit=10**').as('userFeed')

        cy.wait('@userFeed')

        cy.get('@userFeed').then(function(userFeed){
            console.log(userFeed)

            const {response: {
                body
            }} = userFeed

            console.log(body)

            if(body.articlesCount === 0){
                cy.get(yourFeedPageLocators.noArticles)
                    .invoke('text')
                        .should('contains', 'No articles are here... yet.')
            } else{
                console.log(body)
                cy.checkPostsList(yourFeedPageLocators, body)
            }

        })

        return this
    }

    subscribeForFeed(postIndex){
        cy.get(yourFeedPageLocators.globalFeed)
            .click()
        
        mainPage
            .openPost(postIndex)

        postPage
            .checkPostData()

        cy.get(yourFeedPageLocators.subscribeButton).click().then(function(){
            cy.intercept('POST', 'https://api.realworld.io/api/profiles/**/follow').as('follow')

            cy.wait('@follow')

            cy.get('@follow').then(function(followedUser){
                console.log(followedUser.response.body)

                const {response: {
                    body: {
                        profile
                    }
                }} = followedUser

                expect(profile.following).eq(true)

                cy.get(yourFeedPageLocators.homeButton).click()
            })
        })

        return this
    }

}

module.exports = new yourFeedPage()