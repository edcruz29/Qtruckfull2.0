import signupPage from '../support/pages/Signup'


describe('cadastro',()=>{

    it('deve cadastrar com sucesso', () => {

        const user ={
            name:"Eduardo",
            instagram:"@eduardoCruz",
            password:"novoteste2"
        }
       
        // cy.deleteMany({instagram: user.instagram}, {collection: 'users'}).then(res =>{
        //     cy.log(res)
        // })
        
      cy.apiResetUser(user.instagram)

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()

      signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')
    });
    
    it.only('Não deve permitir cadastro com instagram duplicado', () => {

        const user ={
            name:"Karine",
            instagram:"@@KarineE",
            password:"novoteste2"
        }

      cy.apiCreateUser(user)

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.modal.haveText("Instagram já cadastrado!")
    });

    it('nome obrigatório', () => {
        cy.visit('/signup')

        
        cy.get('input[name=instagram]').type("@KarineEd")
        cy.get('input[name=password]').type("pwn12345")

        cy.contains('button', 'Cadastrar').click()
        
        cy.get('#swal2-html-container')
        .should('be.visible')
        .should('have.text',"Por favor, informe o seu nome completo!")

    });
    it('instagram obrigatório', () => {
        cy.visit('/signup')

        cy.get('input[name=name]').type('Karine')
        
        cy.get('input[name=password]').type("pwn12345")

        cy.contains('button', 'Cadastrar').click()
        
        cy.get('#swal2-html-container')
        .should('be.visible')
        .should('have.text', "Por favor, informe o seu código do Instagram!")

    });
    it('senha obrigatória', () => {
        cy.visit('/signup')

        cy.get('input[name=name]').type('Karine')
        cy.get('input[name=instagram]').type("@KarineEd")
        

        cy.contains('button', 'Cadastrar').click()
        
        cy.get('#swal2-html-container')
        .should('be.visible')
        .should('have.text', "Por favor, informe a sua senha secreta!")
    });

    
    it('campos obrigatórios', () => {
        cy.visit('/signup')

        cy.contains('button', 'Cadastrar').click()
        
        cy.get('#swal2-html-container')
        .should('be.visible')
        .should('have.text',"Por favor, preencha todos os campos!")
        
    });
   
})