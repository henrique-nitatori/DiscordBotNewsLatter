import Facade from './Application/Service/Facade'
import MongoDb from "./Infrastructure/DataBase/MongoDB";
import Redis from './Infrastructure/DataBase/Redis'
import NewsRepositoryMongoDb from "./Model/Repository/Implementation/NewsRepositoryMongoDb";
import BotGuildRepositoryMongoDb from './Model/Repository/Implementation/BotGuildRepositoryMongoDB'
import NewsRepositoryRedis from "./Model/Repository/Implementation/NewsRepositoryRedis";


new MongoDb().connect().then(() => {
    new Redis().connect().then(client => {
        const facade = new Facade(new NewsRepositoryMongoDb(),new BotGuildRepositoryMongoDb(), new NewsRepositoryRedis(client))
        facade.botDiscordExecute()
    })    
})

