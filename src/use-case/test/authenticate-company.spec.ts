import { expect, describe, it, beforeEach } from "vitest"
import { RegisterCompanyUseCase } from "../register-company"
import { compare, hash } from "bcryptjs"
import { AuthenticateCompanyUseCase } from "../authenticate-campany"
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-comparies-repository"
import { CompanyAlreadyExistsError } from "../errors/company-already-exists"
import { InvalidCredencialsError } from "../errors/invalid-credencials-error"

let companyRepository: InMemoryCompaniesRepository
let authenticateCompanyUseCase: AuthenticateCompanyUseCase

beforeEach(() => {
    companyRepository = new InMemoryCompaniesRepository()
    authenticateCompanyUseCase = new AuthenticateCompanyUseCase(companyRepository)
})

describe("Register Use Case", () => {

    it("should be able to register", async () => {


        await companyRepository.create({
            nome_fantasia: "Nome Fantasia",
            razao_social: "Razão Social",
            email: "email@gmail.com",
            senha_hash: await hash("123456", 6),
            cnpj: "00.000.000/0000-00",
            sobre: "Sobre",
            img_perfil: "imagem de perfil",
            link_google: "link do google",
            telefone: "00 0 0000-0000",
            email_contato: "email.contato@gmail.com",
            nome_contato: "Nome do Contato",
            cep: "00000-000",
            estado: "Estado",
            cidade: "Cidade",
            rua: "Rua",
            numero: "123"
        })

        const { company } = await authenticateCompanyUseCase.execute({
            email: "email@gmail.com",
            senha: "123456",
        })

        expect(company.id).toEqual(expect.any(String))
    })

    it("should be able to authenticate with wrong email", async () => {


        expect(() =>
            authenticateCompanyUseCase.execute({
                email: "email@gmail.com",
                senha: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })

    it("should be able to authenticate with wrong password", async () => {


        await companyRepository.create({
            nome_fantasia: "Nome Fantasia",
            razao_social: "Razão Social",
            email: "email@gmail.com",
            senha_hash: await hash("123456", 6),
            cnpj: "00.000.000/0000-00",
            sobre: "Sobre",
            img_perfil: "imagem de perfil",
            link_google: "link do google",
            telefone: "00 0 0000-0000",
            email_contato: "email.contato@gmail.com",
            nome_contato: "Nome do Contato",
            cep: "00000-000",
            estado: "Estado",
            cidade: "Cidade",
            rua: "Rua",
            numero: "123"
        })

        expect(() =>
            authenticateCompanyUseCase.execute({
                email: "email@gmail.com",
                senha: "123123",
            })
        ).rejects.toBeInstanceOf(InvalidCredencialsError)
    })


})