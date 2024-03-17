import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabasePostgres {
    list(search){
        return sql`SELECT * FROM videos WHERE title ilike ${'%' + search + '%'};`;
    }

    create(video){
        const id = randomUUID();
        const { title, description, duration } = video;

        return sql`INSERT INTO videos (id, title, description, duration) VALUES (${id}, ${title}, ${description}, ${duration})`;
    }

    async update(id, video){
        const { title, description, duration } = video;
        return await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    delete(id){
        return sql`DELETE from videos where id = ${id};`
    }
}