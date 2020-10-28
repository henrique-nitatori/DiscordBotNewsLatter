import IGuildRepository from '../../Model/Repository/IBotGuildRepository'
import Bot from '../../Infrastructure/BotDiscord/Bot'

export default class StartBotDiscord {
    constructor(private botGuildRepository: IGuildRepository) {

    }

      execute() {
        new Bot(this.botGuildRepository).botOff()
    }
}