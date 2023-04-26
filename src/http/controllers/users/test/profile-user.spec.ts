import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {

        await request(app.server).post('/users').send({
            nome: "Nome",
            email: "email@gmail.com",
            senha: "123456",
            cpf: "000.000.000-00",
            telefone: "00 0 0000-0000",
            cep: "00000-000",
            estado: "Estado",
            cidade: "Cidade",
            rua: "Rua",
            numero: "123",
            nascimento: "00/00/0000"
        })

        const authResponse = await request(app.server).post('/authenticate-user').send({
            email: "email@gmail.com",
            senha: "123456",
        })

        const { token } = authResponse.body;

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "email@gmail.com",
        }))
    })
})