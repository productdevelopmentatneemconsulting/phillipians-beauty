context("Search results tests", () => {
  beforeEach(() => {
    cy.visit("/search-results");
  });

  describe("Search tests", () => {
    it("Looking for search field", () => {
      cy.get(".suggestions-container")
        .find("input")
        .type("hair{enter}");
    });
  });
});
