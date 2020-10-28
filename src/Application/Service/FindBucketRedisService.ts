import NewsRepositoryRedis from "../../Model/Repository/Implementation/NewsRepositoryRedis";

export default class FindBucketRedisService {
    constructor(private newsRespositoryRedis: NewsRepositoryRedis) {

    }

     async execute(date: string) {
        return await this.newsRespositoryRedis.findBucket(date)
    }
}