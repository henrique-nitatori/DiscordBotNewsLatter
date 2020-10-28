import api from 'newsapi'
import Config from '../../../config.json'

export default class NewsApi {
    newsApi: any

    constructor() {
        this.newsApi = new api(Config.apiKey)
    }

    async search() {
        const response = await this.newsApi.v2.topHeadlines({
            pageSize: 10,
            category: 'technology',
            country: 'pt'
          })
         if(response.status === 'ok') {
            return response
         }
         throw new Error( response.status )

    }
}