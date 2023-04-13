export class ResourceNotFoundError extends Error {
    constructor() {
        super('Erro de recurso não encontrado.')
    }
}