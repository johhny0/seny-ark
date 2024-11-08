import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Dino extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    img: string;

    @Column()
    entityId: string;

    @Column()
    catch: boolean = false;

    constructor(name: string, link: string, img: string, entityId: string) {
        super()
        this.id = uuid();
        this.name = name;
        this.link = link;
        this.img = img;
        this.entityId = entityId;
    }
}
