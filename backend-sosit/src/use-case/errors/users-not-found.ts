export class UsersNotFoundError extends Error {
    constructor() {
        super('Nenhum usário encotrado.');
    }
}