import { should } from "chai";

beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
describe("template spec", () => {

  it("should find html", () => {
    cy.get("button").should("contain.text", "Sök");
    cy.get("#searchText").should("exist")
  });

  it("should fetch 10 movies containg (star)", () => {
    cy.get("input").type("star").should("have.value", "star");
    const knappen = cy.get("#search").should("exist");
    knappen.click();
    cy.get("#movie-container .movie", { timeout: 5000 }).should("have.length", 10);
  });

  it("should display fault message", () => {
    const knappen = cy.get("#search").should("exist");
    knappen.click();
    cy.get("p").should("contain.text", "Inga sökresultat att visa");
  });

  it("should show mocked data", () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
      statusCode: 200,
      body: {
        Search: [
          { Title: "Harry Potter", Poster: "img url1" },
          { Title: "Harry Potter 2", Poster: "img url2" }
        ]
      }
    })
    cy.get("#searchText").type("ABC{enter}")
    cy.get("#movie-container .movie").should("have.length", 2);
  })

  it("Should return Sorted data from A-Ö", () => {
  cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
    statusCode: 200,
    body: {
      Search: [
        { Title: "Bertils Film", Poster: "img url1" },
        { Title: "Christers Film", Poster: "img url3" },
        { Title: "Alberts Film", Poster: "img url2" }
      ]
    }
  })
  cy.get("#searchText").type("WASD{enter}")
  cy.get("#movie-container .movie").should("have.length", 3);

  cy.get("#sort").click()
  cy.get("#movie-container .movie").first().should("contain.text", "Alberts Film")
})

  it("Should return Sorted data from Ö-A", () => {
  cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
      statusCode: 200,
      body: {
        Search: [
          { Title: "Bertils Film", Poster: "img url1" },
          { Title: "Christers Film", Poster: "img url3" },
          { Title: "Alberts Film", Poster: "img url2" }
        ]
      }
    })
    cy.get("#searchText").type("WASD{enter}")
    cy.get("#movie-container .movie").should("have.length", 3);
    
    cy.get("#sortInc").click()
    cy.get("#movie-container .movie").first().should("contain.text", "Christers Film")
  })

});
