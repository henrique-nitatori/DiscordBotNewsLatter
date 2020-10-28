import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import NewsEntity from '../../Model/Entity/NewsEntity'


@Entity({ name: 'Bucket'})
export default class Bucket {

    @ObjectIdColumn()
    id?: ObjectID

    @Column("varchar", { default: new Date().toDateString() })
    date: string

    @Column(type => NewsEntity)
    news: NewsEntity[]

    @Column("integer")
    sum_news: number
}