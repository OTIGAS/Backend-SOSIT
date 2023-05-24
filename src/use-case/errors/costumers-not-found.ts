export class CostumersNotFoundError extends Error {
	constructor() {
		super('Nenhum cliente encotrado.');
	}
}