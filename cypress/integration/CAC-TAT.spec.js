/// <reference types= "cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const LargTxt = 'Testando, 1 2 3 , Testando, um, dois , três '

    cy.get('#firstName').type('Islana')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('isa@exemplo.com')
    cy.get('#open-text-area').type(LargTxt, { delay:0 })
    cy.contains('button' , 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Islana')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('isa@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button' , 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('se um valor não-numérico for digitado, seu valor continuará vazio',function(){
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Islana')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('isa@exemplo,com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button' , 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Islana')
      .should('have.value', 'Islana')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Carvalho')
      .should('have.value', 'Carvalho')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('isa@exemplo')
      .should('have.value', 'isa@exemplo')
      .clear()
      .should('have.value', '')
    
    cy.get('#open-text-area')
      .type('Testando um pouco')
      .should('have.value','Testando um pouco')
      .clear()
      .should('have.value','')

    cy.get('#phone')
      .type('123456789')
      .should('have.value','123456789')
      .clear()
      .should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
    cy.contains('button' , 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()  /*Chamando o comando custmzad*/

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback" ', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"') /* Pega todos de elemento radio */

      .should('have.length', 3 ) /* Verifica o comprimento/quantos tem */
      .each(function ($radio) {
        cy.wrap($radio).check() /* "Enpacotando" todos os radios */

        cy.wrap($radio).should('be.checked') /* Verifica se cada um foi realmente selecionado */
      })
  })

it('marca ambos checkboxes, depois desmarca o último', function(){
  cy.get('input[type="checkbox"')
    .check()
    .should('be.checked')
    .last() /* Selecionou só o ultimo */
    .uncheck() /* Desmarcou o ultimo */
    .should('not.be.checked') /* Verificou se realmente foi desmarcado */
})

/*
Revise o teste chamado:
"exibe mensagem de erro quando o telefone se torna obrigatório,
mas não é preenchido antes do envio do formulário, para garantir que em vez de um .click()
o comando .check() é utilizado para marcar o checkbox Telefone.
 */

it('seleciona um arquivo da pasta fixtures',function(){
  cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('seleciona um arquivo simulando um drag-and-drop', function(){
  cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action:"drag-drop"} )
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
})

  /* Maneira mais curta de executar */

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get('#privacy a').should('have.attr','target', '_blank')
  /*                  O comando para isso
      cy.get('.some-link').should('have.attr', 'target', '_blank')
   */
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click()
  /*
    cy.get('#link-que-abre-em-outra-aba')
    .invoke('removeAttr', 'target').
  */
 cy.contains('Talking About Testing').should('have.visible')
})

})
