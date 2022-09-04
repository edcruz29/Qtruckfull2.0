class FoodTruckPage {

    addReview(review) {
        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`)
            .click({force: true})
        cy.contains('button', 'Enviar avaliação').click()
    }
    validateNewReview(review, user){
        cy.get('.details > strong')
        .should('be.visible')
        .should('have.text', user.name)

        cy.get('.comment')
        .should('be.visible')
        .should('have.text', review.comment)
    }

}

export default new FoodTruckPage()