/// <reference types="cypress" />

describe("Network Requests", () => {
    let message = "Unable to find comment!"

    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests")

//Start a server to begin routing responses to cy.route() and cy.request().
      //  cy.server();
    })

    it("Get Request", () => {
        //Listen to GET requests which use the following: comment/ within the url
        //cy.route("GET", "comments/*").as("getComment");
//        cy.route({
            cy.intercept({
            method: "GET",
            url: "**/comments/*",
            response: {
                "postId": 1,
                "id": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.biz",
                "body": "Hello World!"
              }
        }).as("getComment");

        cy.get(".network-btn").click();

        cy.wait("@getComment").its("response.statusCode").should("eq", 200)
    })

    it("Post Request", () => {
   //     cy.route("POST", "/comments").as("postComment");
        cy.intercept("POST", "/comments").as("postComment");
        cy.get(".network-post").click();

        cy.wait("@postComment").should(({request, response}) => {
            console.log(request);
        //    expect(xhr.requestBody).to.include("email");
            expect(request.body).to.include("email");

            console.log(response);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()")
            expect(request.headers).to.have.property("origin", "https://example.cypress.io")

         //   expect(xhr.responseBody).to.have.property("name", "Using POST in cy.intercept()")
         //   expect(xhr.requestHeaders).to.have.property("Content-Type");
        })
    })

    it.only("Put Request", () => {
      //  cy.route({
        cy.intercept({
            method: "PUT",
            url: "**/comments/*"
        }, 
        {
            statusCode: 404,
            body: { error: message},
            delay: 500
        }).as("putComment");

        cy.get(".network-put").click();

        cy.wait("@putComment")

        cy.get(".network-put-comment").should("contain", message)
    })
})