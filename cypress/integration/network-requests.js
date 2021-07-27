/// <reference types="cypress" />

describe("Network Requests", () => {
    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests")

//Start a server to begin routing responses to cy.route() and cy.request().
        cy.server();
    })

    it ("Get Request", () => {
        //Listen to GET requests which use the following: comment/ within the url
        //cy.route("GET", "comments/*").as("getComment");

        cy.route({
            method: "GET",
            url: "comments/*",
            response: {
                "postId": 1,
                "id": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.biz",
                "body": "Hello World!"
              }
        }).as("getComment");

        cy.get(".network-btn").click();

        cy.wait("@getComment").its("status").should("eq", 200)
    })

    it.only("Post Request", () => {
        cy.route("POST", "/comments").as("postComment");

        cy.get(".network-post").click();

        cy.wait("@postComment").should((xhr) => {
            expect(xhr.requestBody).to.include("email");
            expect(xhr.responseBody).to.have.property("name", "Using POST in cy.intercept()")
            expect(xhr.requestHeaders).to.have.property("Content-Type");
        })
    })

    it()
})