import { Client, TextChannel } from 'discord.js'
import IGuildRepository from '../../Model/Repository/IBotGuildRepository'
import Config from '../../../config.json'
import NewsEntity from '../../Model/Entity/NewsEntity'

export default class DiscordBot {
    
    constructor(private botGuildRepository: IGuildRepository,
                private client: Client) {
    }

    execute() {
        this.client.on('ready', async () => {
            console.log('Bot inciado com sucesso')
        })

        this.client.on('guildCreate', async (guild) => {
            console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`)
            this.botGuildRepository.save(guild.id)
            const channelNewsLatter = guild.channels.cache.find(channle => channle.name === 'newslatter')

            let role
             role = guild.roles.cache.find(role => role.name === 'NEWS_LATTER_BOT')
            if(!role) {
                role = await guild.roles.create({
                    data: {
                        name: 'NEWS_LATTER_BOT',
                        color: 'RED'
                    },
                    reason: 'Role atribuida ao channel NewsLatter'
                })
    
            }
            if(channelNewsLatter) {
                channelNewsLatter.permissionOverwrites.map(permission => {
                    permission.delete()
                })
                channelNewsLatter.createOverwrite(role, {
                    SEND_MESSAGES: true
                })
            }

            await guild.channels.create('newslatter', {
                reason: 'Esse canal server para visualizar as novas noticias',
                type: 'text',
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: ['SEND_MESSAGES']
                    },
                    {
                        id: guild.roles.everyone.id,
                        deny: ['SEND_MESSAGES','ATTACH_FILES']
                    }
                ]
            })

        })
        this.client.on('guildDelete', async (guild) => {
            console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`)
            this.botGuildRepository.delete(guild.id)
            
        })

        return this.client.login(Config.discordBotToken)
    }

     async sendMessage(news: NewsEntity[]) {
        const guildIds = await this.botGuildRepository.findAllGuildId()
        if(guildIds.length > 0) {
                guildIds.forEach(guildId => {
                    this.client.guilds.cache.get(guildId.botGuildId.trim()).channels.cache.map(channel => {
                        if(channel.type === 'text' && channel.name === 'newslatter') {
                            let sendChannel = channel as TextChannel; 
                            news.forEach(news => {{
                                sendChannel.send(`**${news.title}**: ${news.description} **Fonte**: ${news.url}`)
                            }})
                        } 
                    })
                })
        }
    }

    botOff() {
        this.client.destroy()
    }
}