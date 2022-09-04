import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {

    it('deve recomendar um food truck', () => {
        const user = {
            name: 'Benson',
            instagram: '@benson',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.526772185711593',
            longitude: '-46.47930049899515',
            name: 'Burgão do ED',
            details: 'Melhor blend de peito bovino!',
            opening_hours: 'das 14h às 23h',
            open_on_weekends: true
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')
    })

    it('Não deve permitir cadastro de recomendação duplicada', ()=>{

        const user = {
            name: 'Karine',
            instagram: '@karine',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.654912156290052',
            longitude: '-46.63867413997651',
            name: 'FoodTruck do Exército',
            details: 'É o que tem aqui na escola',
            opening_hours: 'das 07h às 23h',
            open_on_weekends: false
        }
       
        
        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)


        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Esse food truck já foi cadastrado!')

    })
    it('Localização Obrigatória', ()=>{
        const user = {
            name: 'Volmir',
            instagram: '@mattar',
            password: 'pwd123'
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
       
        createPage.submit()
        createPage.modal.haveText('Por favor, marque a localização no mapa!')
    })
    it('todos os campos são obrigatórios', ()=>{
        const user = {
            name: 'Jobson',
            instagram: '@jobson',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.52545107175581',
            longitude: '-46.47976130247117',
            opening_hours: 'das 14h às 23h',
            open_on_weekends: true
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')
    })
    it('Nome obrigatório', ()=>{
        const user = {
            name: 'Carlton',
            instagram: '@carlton',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.52545107175580',
            longitude: '-46.47976130247120',
            details: 'Tem que falhar pois não tenho o nome!',
            opening_hours: 'das 14h às 23h',
            open_on_weekends: true
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')
    })
    it('Descrição obrigatória', ()=>{
        const user = {
            name: 'Romualdo',
            instagram: '@romualdo',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.52545107175592',
            longitude: '-46.47976130247122',
            name: 'Tem que falhar pois não tenho uma descrição',
            opening_hours: 'das 14h às 23h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')
    })
    it('Horário obrigatório', ()=>{
        const user = {
            name: 'José',
            instagram: '@jose',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.52545107175599',
            longitude: '-46.47976130247136',
            name: 'Café do Jorge',
            details: 'Tem que falhar pois não sei o horário de funcionamento',
            open_on_weekends: true
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')
    })
})