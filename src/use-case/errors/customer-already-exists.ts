export class CustomerAlreadyExistsError extends Error {
	constructor() {
		super('CPF ou Email já cadastrado.');
	}
}