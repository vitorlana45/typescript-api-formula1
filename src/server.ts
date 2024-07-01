import { app } from './app';

const startServer = async () => {

    try {
        await app.listen({ port: 3333 });
        console.log('Servidor rodando na porta 3333');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();