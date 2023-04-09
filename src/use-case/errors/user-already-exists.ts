export class UserAlreadyExistsError extends Error {
    constructor() {
        super('CPF ja cadastrado.')
    }
}