import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('Login', () => {

  it('deve logar com sucesso', () => {

    const user={
      instagram:"@edubehemoth",
      password:"cDz#2020"
    }
    const name="EdCruz"

    //Login com PageObject
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    mapPage.loggedUser(name)

    //LOgin com Commands
    // cy.login(user)
    //cy.loggedUsers(name)
    
  })
  it('não deve logar com senha inválida', () => {

    const user={
      instagram:"@edubehemoth",
      password:"cDz#2022"
    }
    const text="Credenciais inválidas, tente novamente!"
    

    //cy.login(user)
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText(text)

    //cy.modalHaveText(text)

  });

  it('não deve logar com instagram inexistente', () => {

    const user={
      instagram:"@behemothedu",
      password:"cDz#2022"
    }
    const text="Credenciais inválidas, tente novamente!"

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    
    //cy.login(user)

    cy.modalHaveText(text)

  });

  it('não deve logar com instagram fora do padrão', () => {
    const user={
      instagram:"edubehemoth",
      password:"cDz#2022"
    }
   const  text="Credenciais inválidas, tente novamente!"

   loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    //cy.login(user)
    cy.modalHaveText(text)

  });

  it('instagram obrigatório', () => {

    const user={
      //instagram:'{backspace}',
      password:"cDz#2022"
    }
    const  text="Por favor, informe o seu código do Instagram!"

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    //cy.login(user)
    // cy.instagramObrigatorio(user)
    cy.modalHaveText(text)
    
  });

  it('senha obrigatória', () => {

    const user={
      instagram:"@behemothedu",
      //password:'{backspace}'
    }
    const  text="Por favor, informe a sua senha secreta!"
    // cy.senhaObrigatoria(user)

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    //cy.login(user)
    cy.modalHaveText(text)
    
  });

  it('campos nulos', () => {

    // const user={
    //   instagram:'{backspace}',
    //   password:'{backspace}'
    // }
    const  text="Por favor, informe suas credenciais!"
    // cy.vazios()
    //cy.login({})

    loginPage.go()
    loginPage.submit()
    //cy.login(user)
    cy.modalHaveText(text)

  });

})