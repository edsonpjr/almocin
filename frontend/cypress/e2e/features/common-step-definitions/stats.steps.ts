import { Given, When, Then, Then as And } from "@badeball/cypress-cucumber-preprocessor/";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the tests
    return false;
});

beforeEach(() => {
    cy.visit('/adm');
});

Given('o usuário está logado com o email {string} e senha {string}', (admin: string) => {
    cy.visit("/adm");
    //cy.get('[data-cy="login"]').type(admin);
    //cy.get('[data-cy="password"]').type(admin);
    //cy.get('[data-cy="submit-login"]').click();
});
When("acesso a página Estatística", () => {
    cy.visit("/adm/estatisticas");
});
Then("estou na página de título {string}", (title) => {
    cy.get('h1').should('contain.text', title);
});

Given("estou na página Estatística", () => {
    cy.visit("/adm/estatisticas");
});
When("seleciono o filtro todos", () => {
    cy.get('[data-cy="filter-select"]').click();
    cy.wait(1000);
    cy.get('[data-cy="filter-todos"]').click();
    cy.wait(1000);
});
Then("posso ver todas as estatíticas", () => {
    cy.get('[data-cy="filter-select"]').should('contain.text', "Todos");
});

Given("estou na página Estatística", () => {
    cy.visit("/adm/estatisticas");
});
When("seleciono o filtro mês atual", () => {
    cy.get('[data-cy="filter-select"]').click();
    cy.wait(1000);
    cy.get('[data-cy="filter-mes"]').click();
    cy.wait(1000);
});
Then("posso ver as estatíticas do mês atual", () => {
    cy.get('[data-cy="filter-select"]').should('contain.text', "Mês Atual");
});

Given("estou na página Estatística", () => {
    cy.visit("/adm/estatisticas");
});
When("seleciono o filtro mês atual", () => {
    cy.get('[data-cy="filter-select"]').click();
    cy.wait(1000);
    cy.get('[data-cy="filter-receita"]').click();
    cy.wait(1000);
});
Then("posso ver as estatíticas de receita", () => {
    cy.get('[data-cy="filter-select"]').should('contain.text', "Receita");
});
