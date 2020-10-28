import Redis from 'redis'
import { Promise } from 'bluebird'

declare module "redis" {

    export interface RedisClient extends NodeJS.EventEmitter {
        setAsync(key:string, value:string): Promise<void>;
        getAsync(key:string): Promise<string>;
    }

}

export default class RedisDB {

    async connect() {
        const clientRedis = Promise.promisifyAll(Redis)
        const client = clientRedis.createClient()
        client.on("error", function(error) {
            console.error(error);
        });

        return client
    }
}