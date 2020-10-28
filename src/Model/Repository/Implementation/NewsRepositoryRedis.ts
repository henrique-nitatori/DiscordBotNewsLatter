import INewsRepository from "../INewsRepository";
import BucketNewsEntity from '../../Entity/BucketNewsEntity'
import { RedisClient } from "redis";

export default class NewsRepositoryRedis implements INewsRepository {

    constructor(private redis: RedisClient) {

    }

    async save(bucketNewsEntity: BucketNewsEntity) {
        const bucketNewsEntityJson = JSON.stringify(bucketNewsEntity.news) 
        return await this.redis.setAsync(bucketNewsEntity.date, bucketNewsEntityJson)
    }
    async findBucket(date: string): Promise<any> {
        const getAsync = await this.redis.getAsync(date)
        const bucket = JSON.parse(getAsync)
        return bucket
    }


}