// import { createServer } from "node:http";

// const server = createServer((req, res) => {
//     console.log("Hello World");
//     res.write('Ola mundo');
//     res.end();
// });

// server.listen(3333, () => {
//     console.log("Servidor rodando na porta 3333")
// })

import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';
import 'dotenv/config';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get('/', () => {
    return 'Te amo Brenda <3'
})

server.get('/videos', async (request, reply) => {
    const { search } = request.query;

    reply.send(await database.list(search))
});

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    });

    reply.status(201).send();
});

server.put('/videos/:id', async (request, reply) => {
    const id = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(
        id,
        {
            title,
            description,
            duration
        }
    );

    reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {
    const id = request.params.id;
    await database.delete(id);
    reply.status(204).send();
})

server.listen({
    host: "0.0.0.0",
    port: process.env.PORT ?? '3333'
})