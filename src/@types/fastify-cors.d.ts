declare module 'fastify-cors' {
    import { FastifyPluginCallback } from 'fastify';

    interface FastifyCorsOptions {
        origin?: string | string[] | boolean | RegExp | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);
        methods?: string | string[];
        allowedHeaders?: string | string[];
        exposedHeaders?: string | string[];
        credentials?: boolean;
        maxAge?: number | string;
        preflightContinue?: boolean;
        optionsSuccessStatus?: number;
    }

    const fastifyCors: FastifyPluginCallback<FastifyCorsOptions>;

    export default fastifyCors;
}