import { expect, describe, it } from "vitest"
import { RegisterUserUseCase } from "../register-user"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"

describe("Caso de Uso, Cadastro", () => {
    it("should hash user password upon registration", async () => {
        const registerUsersUseCase = new RegisterUserUseCase({
            async findByEmail(email: string) {
                return null
            },

            async findByCPF(senha: string) {
                return null
            },

            async create(data: User) {
                return {
                    id: 'user-1',
                    nome: data.nome,
                    email: data.email,
                    senha_hash: data.senha_hash,
                    cpf: data.cpf,
                    telefone: data.telefone,
                    cep: data.cep,
                    estado: data.estado,
                    cidade: data.cidade,
                    rua: data.rua,
                    numero: data.numero,
                    nascimento: data.nascimento,
                    criado_em: new Date(),
                }
            }
        })

        const { user } = await registerUsersUseCase.execute({
            "nome": "Nome",
            "email": "email@gmail.com",
            "senha": "123456",
            "cpf": "000.000.000-00",
            "telefone": "00 0 0000-0000",
            "cep": "00000-000",
            "estado": "Estado",
            "cidade": "Cidade",
            "rua": "Rua",
            "numero": "123",
            "nascimento": "00/00/0000"
        })

        const isPasswordCorrectlyHashed = await compare("123456", user.senha_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})