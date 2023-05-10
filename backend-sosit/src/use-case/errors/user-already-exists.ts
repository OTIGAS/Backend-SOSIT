export class UserAlreadyExistsError extends Error {
	constructor() {
		super('CPF ou Email já cadastrado.');
	}
}