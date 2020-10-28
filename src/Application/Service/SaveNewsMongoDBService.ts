import NewsEntity from "../../Model/Entity/NewsEntity";
import INewsRepository from "../../Model/Repository/INewsRepository"; 

export default class SaveNewsMongoDBService {
    newsRepository: INewsRepository

    constructor(newsRepository: INewsRepository) {
        this.newsRepository = newsRepository
    }


    execute(response: any) {
        let itens: NewsEntity[] =[]
        
        response.articles.map(item => {
            itens.push({ title: item.title, description: item.description, url: item.url})
        })

        return this.newsRepository.save(
            {
                date: new Date().toDateString(),
                news: itens,
                sum_news: itens.length
            }
        )
        
    }
}