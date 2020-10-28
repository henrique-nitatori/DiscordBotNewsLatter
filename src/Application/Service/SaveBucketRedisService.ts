import NewsRepositoryRedis from "../../Model/Repository/Implementation/NewsRepositoryRedis";
import BucketNewsEntity from '../../Model/Entity/BucketNewsEntity'


export default class SaveBucketRedisService {

    constructor(private newsRespositoryRedis: NewsRepositoryRedis) {

    }


    async execute(bucketNews: BucketNewsEntity) {
        await this.newsRespositoryRedis.save(bucketNews)
    }
}