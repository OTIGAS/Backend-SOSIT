export class CompanyAlreadyExistsError extends Error {
    constructor() {
        super('CNPJ ja cadastrado.')
    }
}