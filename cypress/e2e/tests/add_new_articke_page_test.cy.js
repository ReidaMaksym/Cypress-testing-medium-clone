/// <reference types="cypress" />

import mainPage from "../pages/main_page";
import yourFeedPage from "../pages/your_feed";
import signInPage from "../pages/sign_in";
import addNewArticlePage from "../pages/add_new_article";

describe("Add new article page testing", function(){
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
            .openNewArticlePage()
        
        addNewArticlePage
            .fillInForm({
                title: true,
                description: true,
                mainContent: true
            })
            .createNewArticle()
            .addCommentToArticle()
            .postNewComment()
            .addCommentToArticle()
            .postNewComment()
            .addCommentToArticle()
            .postNewComment()
            // .deleteComment({
            //     deleteAllComments: true,
            //     commentIndex: -1
            // })
            .deleteComment({
                deleteAllComments: false,
                commentIndex: 1
            })

    })
})