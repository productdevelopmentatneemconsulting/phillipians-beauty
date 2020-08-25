context("Header and Footer Mobile Tests", () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iphone x
    cy.visit("");
  });

  describe("Header tests", () => {
    it("Header is present and has Navigation bar", () => {
      cy.get("header")
        .find("div.bp-container")
        .find("span")
        .should("be.visible")
        .contains("Toggle Navigation")
        .parent()
        .wait(1000)
        .click()
        .find("ul")
        .should("contain", "Hair")
        .and("be.visible")
        .should("contain", "Skin")
        .and("be.visible")
        .should("contain", "Well Being")
        .and("be.visible")
        .should("contain", "Product Showcase")
        .and("be.visible")
        .should("contain", "Meet The Team")
        .and("be.visible");
    });
  });

  describe("Footer tests", () => {
    it("Footer has Socials", () => {
      cy.get("footer")
        .find("div")
        .first()
        .find("ul")
        .should("be.visible")
        .find("li")
        .within(() => {
          cy.get("a")
            .should("be.visible")
            .should("have.attr", "href")
            .and("contain", "https://www.pinterest.com/AllThingsHair/");
          cy.get("a")
            .eq(1)
            .should("be.visible")
            .should("have.attr", "href")
            .and("contain", "https://twitter.com/AllThingsHairuk");
          cy.get("a")
            .eq(2)
            .should("be.visible")
            .should("have.attr", "href")
            .and("contain", "https://www.youtube.com/user/allthingshairPH");
          cy.get("a")
            .eq(3)
            .should("be.visible")
            .should("have.attr", "href")
            .and("contain", "https://www.facebook.com/AllThingsHairPH/");
          cy.get("a")
            .eq(4)
            .should("be.visible")
            .should("have.attr", "href")
            .and("contain", "https://www.instagram.com/allthingshairuk/");
        });
    });

    it("Footer has Navigation bar", () => {
      cy.get("footer")
        .find("nav")
        .find("ul")
        .should("be.visible")
        .find("li")
        .should("contain", "About Us")
        .and("be.visible")
        .should("contain", "Privacy")
        .and("be.visible")
        .should("contain", "Cookie Notice")
        .and("be.visible")
        .should("contain", "Contact Us")
        .and("be.visible")
        .should("contain", "Site Map")
        .and("be.visible")
        .should("contain", "Terms of Use")
        .and("be.visible");
    });

    it("Footer has Copyright", () => {
      cy.get("footer")
        .find("div")
        .last()
        .should("be.visible")
        .should("contain", "Copyright")
        .and("be.visible")
        .should("contain", new Date().getFullYear());
    });
  });
});
