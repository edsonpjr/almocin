Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the tests
    return false
})


describe('Home flows', () => {
    it('acesso da página Cardapio', () => {
        cy.visit('/adm/cardapio')
    });

    it('acesso da página de Usuarios', () => {
        cy.visit('/adm/usuarios')
    });

    it('acesso da página de Estatísticas', () => {
        cy.visit('/adm/estatisticas')
    });

    it('acesso da página de Categorias', () => {
        cy.visit('/adm/categorias')
    });
});
