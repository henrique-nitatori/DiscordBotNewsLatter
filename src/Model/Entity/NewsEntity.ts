import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class NewsEntity {

    
    @ObjectIdColumn()
    id?: ObjectID
    
    @Column("varchar")
    title: string;

    @Column("varchar")
    description: string;

    @Column("varchar")
    url: string;

}