import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Dino extends BaseEntity{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    catch: boolean = false;

    constructor(name: string) {
        super()
        this.id = uuid();
        this.name = name;
    }
}