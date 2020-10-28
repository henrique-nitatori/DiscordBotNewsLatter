import INewsRepository from "../../Model/Repository/INewsRepository"; 

export default class FindBucketNewsMongoDBService {
    newsRepository: INewsRepository

    constructor(newsRepository: INewsRepository) {
        this.newsRepository = newsRepository
    }


    async execute() {
        return await this.newsRepository.findBucket(new Date().toDateString())
    }
}