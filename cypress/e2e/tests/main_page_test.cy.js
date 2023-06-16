/// <reference types="cypress" />

import mainPage from "../pages/main_page";

describe('Main page testing', function(){

    it('', function(){
        mainPage.visitMainPage()
            .checkGlobalFeed()
    })

})