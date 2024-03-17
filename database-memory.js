import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
    #videos = new Map();

    list(search){
        return Array.from(this.#videos.entries())
        .map(item => {
            const id = item[0];
            const data = item[1];

            return {
                id,
                ...data
            }
        })
        .filter(item => {
            if(search){
                return item.title.includes(search)
            }
            return true;
        })
    }

    create(video){
        const videoId = randomUUID();
        this.#videos.set(videoId, video);
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }
}