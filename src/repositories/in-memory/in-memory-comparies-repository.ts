import { Prisma, Company } from "@prisma/client";
import { CompaniesRepository } from "../companies-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCompaniesRepository implements CompaniesRepository {

    public items: Company[] = []

    async create(data: Prisma.CompanyCreateInput): Promise<Company> {
        const company = {
            id: randomUUID(),
            nome_fantasia: data.nome_fantasia,
            razao_social: data.razao_social,
            email: data.email,
            senha_hash: data.senha_hash,
            cnpj: data.cnpj,
            sobre: data.sobre,
            img_perfil: data.img_perfil,
            link_google: data.link_google,
            telefone: data.telefone,
            email_contato: data.email_contato,
            nome_contato: data.nome_contato,
            cep: data.cep,
            estado: data.estado,
            cidade: data.cidade,
            rua: data.rua,
            numero: data.numero,
            criado_em: new Date(),
        }

        this.items.push(company)

        return company
    }


    async findByCNPJ(cnpj: string): Promise<Company | null> {
        const company = this.items.find((item) => item.cnpj === cnpj)

        if (!company) {
            return null;
        }

        return company
    }

    async findByEmail(email: string): Promise<Company | null> {
        const company = this.items.find((item) => item.email === email)

        if (!company) {
            return null;
        }

        return company
    }

    async findById(id: string): Promise<Company | null> {
        const company = this.items.find((item) => item.id === id)

        if (!company) {
            return null;
        }

        return company
    }
}