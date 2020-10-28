import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'


@Entity({ name: 'BotGuildEntity'})
export default class BotGuildEntity {

    @ObjectIdColumn()
    id?: ObjectID

    @Column("varchar")
    botGuildId: string

}