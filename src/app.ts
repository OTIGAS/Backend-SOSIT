import { ZodError } from 'zod';
import { appRoutes } from './http/routes';
import fastify from 'fastify';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: "Erro na validação.", problema: error.format()
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Em caso de erro na produção:
        // poderiamos fazer um log para uma ferramenta externa (DataDog/NewRelic/Sentry)
    }

    return response.status(500).send({
        message: "Erro interno no server."
    })
})
