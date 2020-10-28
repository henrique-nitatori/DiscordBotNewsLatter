import BucketNewsEntity from '../Entity/BucketNewsEntity'

export default interface INewsRepository {
    save(bucketNewsEntity: BucketNewsEntity): Promise<BucketNewsEntity> | Promise<void>;
    findBucket(date: string): Promise<BucketNewsEntity>
}