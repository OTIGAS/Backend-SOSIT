import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';


import { env } from './env';

import { ZodError } from 'zod';

import { customersRoutes } from './http/controllers/customers/routes';
import { companiesRoutes } from './http/controllers/companies/routes';
import { scheduleRoutes } from './http/controllers/schedules/routes';
import { commitmentRoutes } from 'http/controllers/commitments/routes';

export const app = fastify();

app.register(cors, {
	origin: 'http://localhost:3001',
	methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: 'X-CSRF-Token, X-Requested-With, Content-Type, Authorization',
	credentials: true,
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
});

app.register(customersRoutes);
app.register(companiesRoutes);
app.register(scheduleRoutes);
app.register(commitmentRoutes);

app.setErrorHandler((error, _, response) => {
	if (error instanceof ZodError) {
		return response.status(400).send({
			message: 'Erro na validação.',
			problema: error.format(),
		});
	}
	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Em caso de erro na produção:
		// poderiamos fazer um log para uma ferramenta externa (DataDog/NewRelic/Sentry)
	}

	return response.status(500).send({
		message: error.message,
	});
});
