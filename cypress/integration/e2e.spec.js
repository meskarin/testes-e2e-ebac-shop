/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')   
const produto = require('../fixtures/produto.json')


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')       
        
      
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Usuário cadastrado', () => {
        cy.visit('/minha-conta')
        cy.fixture('perfil').then(dados =>{ 
            cy.login(dados.usuario, dados.senha)
            
        })
        cy.visit('/produtos') 
        cy.fixture('produto').then(carrinho =>{
            cy.addCarrinho(carrinho[0].produto, carrinho[0].tamanho, carrinho[0].cor, 2 )
            cy.get('.woocommerce-message').should('contain',carrinho[0].produto)
            cy.addCarrinho(carrinho[1].produto, carrinho[1].tamanho, carrinho[1].cor, 1 )
            cy.get('.woocommerce-message').should('contain',carrinho[1].produto)
            cy.addCarrinho(carrinho[2].produto, carrinho[2].tamanho, carrinho[2].cor, 2 )
            cy.get('.woocommerce-message').should('contain',carrinho[2].produto)
            cy.addCarrinho(carrinho[3].produto, carrinho[3].tamanho, carrinho[3].cor, 1 )
            cy.get('.woocommerce-message').should('contain',carrinho[3].produto)
        })
     
        cy.checkout()
        cy.get('#main').should('contain','Obrigado. Seu pedido foi recebido.')
    })
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Novo Usuário', () => {
        cy.visit('/minha-conta')

        cy.precadastro()
        
        cy.visit('/produtos') 
        cy.fixture('produto').then(carrinho =>{
            cy.addCarrinho(carrinho[0].produto, carrinho[0].tamanho, carrinho[0].cor, 2 )
            cy.get('.woocommerce-message').should('contain',carrinho[0].produto)
            cy.addCarrinho(carrinho[1].produto, carrinho[1].tamanho, carrinho[1].cor, 1 )
            cy.get('.woocommerce-message').should('contain',carrinho[1].produto)
            cy.addCarrinho(carrinho[2].produto, carrinho[2].tamanho, carrinho[2].cor, 2 )
            cy.get('.woocommerce-message').should('contain',carrinho[2].produto)
            cy.addCarrinho(carrinho[3].produto, carrinho[3].tamanho, carrinho[3].cor, 1 )
            cy.get('.woocommerce-message').should('contain',carrinho[3].produto)
        })
        cy.checkout()
        cy.get('#main').should('contain','Obrigado. Seu pedido foi recebido.')
    })
})