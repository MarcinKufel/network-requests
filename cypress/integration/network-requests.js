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
})