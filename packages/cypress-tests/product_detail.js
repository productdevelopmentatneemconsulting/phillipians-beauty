describe("Product Details", () => {
  it("Visit to product page", () => {
    cy.viewport(1920, 800);
    cy.visit(
      "http://localhost:8000/product-showcase/tresemme-keratin-smooth-flat-iron-smoothing-spray/"
    );
  });

  it("Accordion is present and working properly", () => {
    cy.get(".bp-product-detail_accordion_header").click();
    cy.get(".bp-product-detail_accordion_contentExpand").should("be.visible");

    cy.get(".bp-product-detail_accordion_header").click();
    cy.get(".bp-product-detail_accordion_contentCollapse").should("be.visible");
  });

  it("Products recommendation is present and workign properly", () => {
    cy.get(".bp-productSlider")
      .find(".swiper-wrapper")
      .children()
      .should("not.have.length", 0);
  });

  it("Article recommendation is present and workign properly", () => {
    cy.get(".bp-theme_primary")
      .find(".swiper-wrapper")
      .children()
      .should("not.have.length", 0);
  });
});
