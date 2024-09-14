it('deve exibir o conteúdo da política de privacidade corretamente',function(){
    // Visita a página de Política de Privacidade
    cy.visit('./src/privacy.html')
    
    // Verifica se o título ou um texto específico está presente
    cy.contains('Talking About Testing').should('be.visible')
   
})

