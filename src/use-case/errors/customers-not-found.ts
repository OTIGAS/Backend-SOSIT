export class CustomersNotFoundError extends Error {
	constructor() {
		super('Nenhum cliente encotrado.');
	}
}