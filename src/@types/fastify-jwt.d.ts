import '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        costumer: {
            sub: string
        }
    }
}