import INewsRepository from "../INewsRepository";
import BucketNewsEntity from '../../Entity/BucketNewsEntity'
import { getMongoManager } from "typeorm";


export default class NewsRepositoryMongoDb implements INewsRepository {
    constructor() {

    }

    async save(bucketNewsEntity: BucketNewsEntity) {
        let  newBucket = new BucketNewsEntity()
        newBucket = { ...bucketNewsEntity }
       const manager = getMongoManager();
       return await manager.save(BucketNewsEntity, newBucket)
    }

    findBucket(date: string): Promise<BucketNewsEntity> {
        const manager = getMongoManager();
        return manager.findOne(BucketNewsEntity, { date: date })
    }


}