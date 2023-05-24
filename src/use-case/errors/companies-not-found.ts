export class CompaniesNotFoundError extends Error {
	constructor() {
		super('Nenhuma empresa encotrada.');
	}
}