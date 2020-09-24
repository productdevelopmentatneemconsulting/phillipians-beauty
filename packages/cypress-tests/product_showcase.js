context("Product Showcase page tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 800);
    cy.visit("/product-showcase");
  });

  describe("Text block (type b)", () => {
    it("Intro Text block is present", () => {
      cy.get("main")
        .wait(500)
        .find("section.typeb")
        .should("be.visible");
    });
  });

  describe("Search block", () => {
    it("Search block is present", () => {
      cy.get("main")
        .wait(500)
        .find("section.search-container-results")
        .should("be.visible");
    });
  });

  describe("Image block (type b)", () => {
    it("Image block is present and visible", () => {
      cy.get("main")
        .wait(500)
        .find("section.bp-imageBlock")
        .should("be.visible");
    });
  });

  describe("Tile block", () => {
    it("Tile slider is present and visible", () => {
      cy.get("main")
        .wait(500)
        .find("section.tile")
        .should("be.visible");
    });
  });

  describe("Text block (type a)", () => {
    it("Text block is present", () => {
      cy.get("main")
        .wait(500)
        .find("section.typea")
        .should("be.visible");
    });
  });

  describe("Taxonomy block", () => {
    it("Taxonomy block is present", () => {
      cy.get("main")
        .wait(500)
        .find("section.bp-tags")
        .should("be.visible");
    });
  });
});
