import BotGuildEntity from "../Entity/BotGuildEntity";

export default interface IBotGuildRepository {
    save(botGuildId: string): void 
    delete(botGuildId: string): void 
    findAllGuildId(): Promise<BotGuildEntity[]>
}