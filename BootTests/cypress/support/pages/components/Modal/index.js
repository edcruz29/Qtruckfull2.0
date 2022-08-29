class Modal {
    haveText(text){
        cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text',text)
    }

    confirm(){
        cy.get('.swal2-confirm')
        .should('be.visible')
        .click()
    }

}
export default new Modal()