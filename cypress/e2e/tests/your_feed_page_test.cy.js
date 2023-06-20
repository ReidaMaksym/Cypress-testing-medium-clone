/// <reference types="cypress" />

import mainPage from "../pages/main_page";
import yourFeedPage from "../pages/your_feed";
import signInPage from "../pages/sign_in";

describe("User's feed page testing", function(){
    it('', function(){

        mainPage
            .visitMainPage()
            .openSignInPage()

        signInPage
            .fillInform({
                email: true,
                password: true
            })
            .signInButtonClick()

        yourFeedPage
            .checkYourFeed()
            .subscribeForFeed(1)
            .checkYourFeed()
    })
})