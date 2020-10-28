import IGuildRepository from '../../Model/Repository/IBotGuildRepository'
import Bot from '../../Infrastructure/BotDiscord/Bot'
import { Client } from 'discord.js'

export default class StartBotDiscord {
    constructor(private botGuildRepository: IGuildRepository,
                private client: Client) {

    }

    async execute() {
       await new Bot(this.botGuildRepository, this.client).execute()
    }
}