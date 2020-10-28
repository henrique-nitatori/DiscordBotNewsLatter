import NewsEntity from "../../Model/Entity/NewsEntity";
import IGuildRepository from '../../Model/Repository/IBotGuildRepository'
import Bot from '../../Infrastructure/BotDiscord/Bot'
import { Client } from "discord.js";


export default class SendMessageBotDiscord {
    constructor(private botGuildRepository: IGuildRepository,
                private client: Client) {

    }

     execute(news: NewsEntity[]) {
         new Bot(this.botGuildRepository, this.client).sendMessage(news)
    }
}