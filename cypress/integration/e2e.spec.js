/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')   


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
        cy.addCarrinho("Abominable Hoodie", "M", "Blue", 2 )
        cy.addCarrinho("Aero Daily Fitness Tee", "M", "Yellow", 3 )
        cy.addCarrinho("Apollo Running Short", "33", "Black", 1 )
        cy.addCarrinho("Ariel Roll Sleeve Sweatshirt", "M", "Purple", 2 )
        
        cy.checkout()

    })
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Novo Usuário', () => {
        cy.visit('/minha-conta')

        cy.precadastro()
        
        cy.visit('/produtos') 
        cy.addCarrinho("Abominable Hoodie", "M", "Blue", 2 )
        cy.addCarrinho("Aero Daily Fitness Tee", "M", "Yellow", 3 )
        cy.addCarrinho("Apollo Running Short", "33", "Black", 1 )
        cy.addCarrinho("Ariel Roll Sleeve Sweatshirt", "M", "Purple", 2 )
        
        cy.checkout()

    })
})