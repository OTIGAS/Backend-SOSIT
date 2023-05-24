export class InvalidCredencialsError extends Error {
	constructor() {
		super('Credenciais inválidas.');
	}
}