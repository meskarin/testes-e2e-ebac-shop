// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import enderecoFaturamento from './page_objects/alterar-enderecos'
const novoEndereco = require('../fixtures/novoEndereco.json')
var faker = require('faker-br')

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('registro', (email, password) =>{
    cy.visit('/minha-conta')
    cy.get('#reg_email').type(faker.internet.email)
    cy.get('#reg_password').type(faker.internet.password)
    cy.get(':nth-child(4) > .button').click()
})


Cypress.Commands.add('addCarrinho', (produto, tamanho, cor, quantidade) =>{
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('[class="product-block grid"]')
        .contains(produto)
        .click()
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()     
    cy.get('.woocommerce-message').should('contain',produto)
})

Cypress.Commands.add('checkout', (nome,sobrenome,empresa,pais,endereco,numero,cidade,estado,cep,telefone,email) =>{
    cy.visit('/carrinho')
    cy.get('.checkout-button').click()

    //Chamar uma classe para alterar endereço de faturamento no checkout
    enderecoFaturamento.checkoutFaturamento(
        novoEndereco[0].nome,
        novoEndereco[0].sobrenome,
        novoEndereco[0].empresa,
        novoEndereco[0].pais,
        novoEndereco[0].endereco,
        novoEndereco[0].numero,
        novoEndereco[0].cidade,
        novoEndereco[0].estado,
        novoEndereco[0].cep,
        novoEndereco[0].telefone,
        novoEndereco[0].email
    )


    cy.get('#order_comments').type('Teste de pedido completo!')
    cy.get('#terms').check()
    cy.get('#place_order').click()
    cy.get('#main').should('contain','Obrigado. Seu pedido foi recebido.')

})