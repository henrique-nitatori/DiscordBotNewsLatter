import Cron from 'node-cron'
import NewsRepositoryRedis from "../../Model/Repository/Implementation/NewsRepositoryRedis";
import SaveNewsMongoDBService from "./SaveNewsMongoDBService";
import SearchNewsService from "./SeachNewsService";
import SaveBucketRedisService from "./SaveBucketRedisService";
import FindBucketRedisService from "./FindBucketRedisService";
import NewsEntity from "../../Model/Entity/NewsEntity";
import StartBotDiscord from "./StartBotDiscord";
import NewsRepositoryMongoDb from '../../Model/Repository/Implementation/NewsRepositoryMongoDb';
import StopBotDiscord from "./StopBotDiscord";
import SendMessageBotDiscord from './SendMessageBotDiscord'
import BotGuildRepositoryMongoDb from '../../Model/Repository/Implementation/BotGuildRepositoryMongoDB'
import { Client } from 'discord.js';

export default class Facade {
   client: Client
     constructor(private newsRepositoryMongoDb: NewsRepositoryMongoDb,
                private botGuildRepositoryMongoDb: BotGuildRepositoryMongoDb,
                private newsRepositoryRedis: NewsRepositoryRedis) {
        this.client = new Client()
        Cron.schedule('50 10 * * *', async () => {
            console.log('pesquisando...')
            await this.searchNews()
        })
        Cron.schedule('00 11 * * *', async () => {
            console.log('enviando mensagem ...')
            await this.sendMessage()
        })
    }


    private async searchNews() {
        const bucket = await this.findNewsApiAndSaveMongoDbExecute()
        await this.findNewsMongoDbAndSaveRedisExecute(bucket)
    }
    private async sendMessage() {
        const bucketRedis = await this.findNewsRedisExecute()
        this.sendMessageBotDiscord(bucketRedis)
    }
    private async findNewsApiAndSaveMongoDbExecute() {
        const newBucket = await new SearchNewsService().execute()
        return new SaveNewsMongoDBService(this.newsRepositoryMongoDb).execute(newBucket)
    }
    private async findNewsMongoDbAndSaveRedisExecute(bucket) {
        new SaveBucketRedisService(this.newsRepositoryRedis).execute(bucket)
    }
    private async findNewsRedisExecute() {
        return await new FindBucketRedisService(this.newsRepositoryRedis).execute(new Date().toDateString())
    }
    async botDiscordExecute() {
        await new StartBotDiscord(this.botGuildRepositoryMongoDb, this.client).execute()
    }
    private sendMessageBotDiscord(news: NewsEntity[]) {
         new SendMessageBotDiscord(this.botGuildRepositoryMongoDb, this.client).execute(news)
    }
    private stopBotDiscord() {
        new StopBotDiscord(this.botGuildRepositoryMongoDb).execute()
    }
}