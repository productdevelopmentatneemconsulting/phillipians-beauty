context("Search results tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/search-results");
  });

  describe("Search tests", () => {
    it("Looking for search field", () => {
      cy.get("form")
        .find("input")
        .type("hair{enter}");
    });
  });
});
