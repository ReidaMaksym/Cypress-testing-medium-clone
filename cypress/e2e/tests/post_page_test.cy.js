/// <reference types="cypress" />

import mainPage from "../pages/main_page";
import postPage from "../pages/post_page";

describe('Post page testing', function(){

    it('', function(){
        mainPage
            .visitMainPage()
            .openPost(2)

        postPage
            .checkPostData()
    })

})