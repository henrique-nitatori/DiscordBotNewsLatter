import NewsApi from '../../Infrastructure/NewsApi/NewsApi'

export default class SearchNewsService {

     async execute() {
        const news = await new NewsApi().search()
        return news
    }
}