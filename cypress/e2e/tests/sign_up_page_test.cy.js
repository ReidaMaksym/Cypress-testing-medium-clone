/// <reference types="cypress" />

import mainPage from "../pages/main_page";
import signUpPage from "../pages/sign_up";

describe('Sign up page testing', function(){

    it('', function(){
        mainPage
            .visitMainPage()
            .openSingUpPage()
        
        signUpPage
            .fillInForm({
                userName: true,
                email: true,
                password: true
            })
            .submitForm()
    })

})