import { ZodError } from 'zod';
import fastify from 'fastify';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './http/controllers/users/routes';
import { companiesRoutes } from './http/controllers/companies/routes';
import { scheduleRoutes } from './http/controllers/schedules/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(usersRoutes);
app.register(companiesRoutes);
app.register(scheduleRoutes);

app.setErrorHandler((error, _, response) => {
	if (error instanceof ZodError) {
		return response.status(400).send({
			message: 'Erro na validação.', problema: error.format()
		});
	}
	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Em caso de erro na produção:
		// poderiamos fazer um log para uma ferramenta externa (DataDog/NewRelic/Sentry)
	}

	return response.status(500).send({
		message: 'Erro interno no server.'
	});
});
