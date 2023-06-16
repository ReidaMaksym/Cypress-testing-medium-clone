/// <reference types="cypress" />

const mainPageLocators = {

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

            cy.get('article-preview > .article-preview').each(function($el, index, $list){

                cy.get($el.find('.info > a'))
                    .invoke('text')
                        .should('contains', body.articles[index].author.username)

                cy.get($el.find('.ng-isolate-scope  ng-transclude > .ng-isolate-scope.ng-scope.pull-xs-right > .btn.btn-outline-primary.btn-sm > ng-transclude > .ng-binding.ng-scope'))
                    .invoke('text')
                        .should('contains', body.articles[index].favoritesCount)

                cy.get($el.find('.preview-link > h1'))
                    .invoke('text')
                        .should('contains', body.articles[index].title)

                cy.get($el.find('.preview-link > p'))
                    .invoke('text')
                        .should('contains', body.articles[index].description)
                
                cy.get($el.find('.preview-link > .tag-list > li')).each(function($el2, index2, $list2){

                    expect($el2.text().trim())
                        .contains(body.articles[index].tagList[index2])
                
                })
            })
        })

        return this
    }

}

module.exports = new mainPage()