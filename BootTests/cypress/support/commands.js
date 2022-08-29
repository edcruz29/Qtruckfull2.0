

  import loginPage from './pages/Login'
  import mapPage from './pages/Map'

  Cypress.Commands.add('modalHaveText', (text)=>{
    

    cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text',text)
  })

  Cypress.Commands.add('loggedUsers', (name)=>{
    
    cy.get('p.logged-user')
    .should('be.visible')
    .should('have.text', `Olá, ${name}`)
   
  })

  Cypress.Commands.add('cadastrar', (user)=>{

    cy.visit('/signup')

    cy.get('input[name=name]').type(user.name)
    cy.get('input[name=instagram]').type(user.instagram)
    cy.get('input[name=password]').type(user.password)

    cy.contains('button', 'Cadastrar').click()

  })

  Cypress.Commands.add('apiResetUser', (instagram)=>{
    cy.request({
        url: 'http://localhost:3333/helpers/reset',
        method: 'DELETE',
        qs:{instagram:instagram}
    }).then(response =>{
        expect(response.status).to.eql(204)
    })
})

  Cypress.Commands.add('apiCreateUser', (payload)=>{
    cy.apiResetUser(payload.instagram)
    cy.request({
      url: 'http://localhost:3333/signup',
      method:'POST',
      body: payload
    }).then(response =>{
      expect(response.status).to.eql(201)
  })
  })

  Cypress.Commands.add('uiLogin', (user)=>{
        loginPage.go()
        loginPage.form(user)
        loginPage.submit()

        mapPage.loggedUser(user.name)
  })

  Cypress.Commands.add('setGeolocation', (lat,long)=>{
    localStorage.setItem('qtruck:latitude', String(lat))
    localStorage.setItem('qtruck:longitude', String(long))
  })