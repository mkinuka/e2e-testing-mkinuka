describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
  });
  // it("should have a button", () => {
  //     //assign
  //     cy.visit("http://localhost:5173/");
  //     const theButton = cy.get("button").should("exist");
  //     //act
  //     theButton.click();
  //     //assert
  //     cy.get("h2").should("contain.text", "Välkommen till din todo-lista");
  //     // cy.get("h2").contains("Välkommen till din todo-lista");
  // });
  it("should have a search button", () => {
    cy.visit("http://localhost:5173/");
    cy.get("button").should("contain.text", "Sök");
  });

  it("should fetch movies containg (star)", () => {
    cy.visit("http://localhost:5173/");

    cy.get("input").type("star").should("have.value", "star");

    const knappen = cy.get("button").should("exist");

    knappen.click();
  });

  it("should show fault message", () => {
    cy.visit("http://localhost:5173/");

    // cy.get("input").type("empty").should("have.value", "");

    const knappen = cy.get("button").should("exist");

    knappen.click();

    cy.get("p").should("contain.text", "Inga sökresultat att visa");
  });
});
