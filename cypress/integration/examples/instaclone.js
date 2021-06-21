/// <reference types="Cypress"/>

let token_api



it('Postando Foto',() =>{

    cy.intercept('*login*')
            .as('login_route')
      .intercept('*post*')
            .as('post_route')

    cy.visit('https://www.instaclone.net/')

        .log('Login')

        .get(':nth-child(1) > .form-group__input')
            .type('teste.guilisboa@teste.com',{force:true})

        .get(':nth-child(2) > .form-group__input')
            .type('Teste#123',{force:true})

        .get('.form-card__form > .button')
            .click()

        .log('Aguardando as duas Request de Login serem finalziadas')

        .wait('@login_route')
            .its('response.statusCode')
                .should('eq',200)
        .wait('@login_route')
            .its('response.statusCode')
                .should('eq',200)


        .get('#file-upload')
                .should('exist')
                    .attachFile('foto-01.jpg')

        .get('button')
            .contains('Next')
                .click()

        .get('.post-form__textarea')
            .should('be.visible')
                .type('Test Teste Teste \n #teste')

        .get('button')
            .contains('Share')
                .click()

        .wait('@post_route')
            .its('response.statusCode')
                .should('eq',200)


})

// it('Insta Clone',() => { 

//     cy.request({
//         method: 'POST',
//         url: 'https://www.instaclone.net/api/auth/login',
//         body: {
//             usernameOrEmail:"teste.guilisboa@teste.com",
//             password:"Teste#123"

//         }
//     }).then((response) => {

//         token_api = response.body.token

//         cy.visit({
//             url: 'https://www.instaclone.net/api/auth/login',
//             method: 'POST',
//             body: {
//                 token: token_api
//             }

//         })
//     })



// })