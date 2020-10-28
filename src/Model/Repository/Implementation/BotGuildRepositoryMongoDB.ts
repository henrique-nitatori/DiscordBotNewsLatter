import BotGuildEntity from "../../Entity/BotGuildEntity";
import IBotGuildRepository from "../IBotGuildRepository";
import { getMongoManager } from "typeorm";

export default class BotGuildRepositoryMongoDB implements IBotGuildRepository{
    constructor(){}

    async save(botGuildId: string) {
        const manager = getMongoManager();
        await manager.save(BotGuildEntity, { botGuildId })
    }
    async delete(botGuildId: string) {
        const manager = getMongoManager();
        await manager.delete(BotGuildEntity, { botGuildId })   
     }
    async findAllGuildId(): Promise<BotGuildEntity[]> {
        const manager = getMongoManager();
        return await manager.find(BotGuildEntity)
    }
    
}