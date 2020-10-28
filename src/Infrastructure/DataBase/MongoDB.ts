import { createConnection } from 'typeorm'

export default class MongoDb {

    async connect() {
        await createConnection()

    }

}