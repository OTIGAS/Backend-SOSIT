export class CostumerAlreadyExistsError extends Error {
	constructor() {
		super('CPF ou Email já cadastrado.');
	}
}