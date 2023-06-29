/// <reference types="cypress" />

import mainPage from "../pages/main_page";

describe('Main page testing', function(){

    it('', function(){
        mainPage.visitMainPage()
            .checkGlobalFeed()
            .pagination(2)
            .checkGlobalFeed()
            .pagination(3)
            .checkGlobalFeed()
    })

    it.only('', function(){
        mainPage.visitMainPage()
            // .checkGlobalFeed()
            // .checkPopularTags()
            .openPost(1)
    })

    // it.only('scrapingData', function(){
    //     mainPage
    //         .visitMainPage()
    //         .scrapingDataFromGlobalFeed()
    // })

})