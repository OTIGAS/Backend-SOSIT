import { CompaniesRepository } from "../repositories/companies-repository";
import { InvalidCredencialsError } from "./errors/invalid-credencials-error";
import { compare } from "bcryptjs";
import { Company } from "@prisma/client";

interface AuthenticateCompanyUseCaseRequest {
    email: string;
    senha: string;
}

interface AuthenticateCompanyUseCaseResponse {
    company: Company;
}

export class AuthenticateCompanyUseCase {
    constructor(private companiesRepository: CompaniesRepository) { }

    async execute({
        email, senha
    }: AuthenticateCompanyUseCaseRequest): Promise<AuthenticateCompanyUseCaseResponse> {
        const company = await this.companiesRepository.findByEmail(email);

        if (!company) {
            throw new InvalidCredencialsError()
        }

        const doesPasswordMatches = await compare(senha, company.senha_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredencialsError()
        }

        return {
            company
        }
    }
}