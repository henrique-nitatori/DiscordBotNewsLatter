import { RedisClient } from "redis";

export default class RedisClear {

    constructor(private client: RedisClient) {

    }

    async execute() {
        this.client.flushall()
    }
}