export class CompanyAlreadyExistsError extends Error {
	constructor() {
		super('CNPJ ou Email já cadastrado.');
	}
}