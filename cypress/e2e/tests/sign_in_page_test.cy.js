/// <reference types="cypress" />

import mainPage from "../pages/main_page";
import signInPage from "../pages/sign_in";

describe('Sign in page testing', function(){
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
    })
})