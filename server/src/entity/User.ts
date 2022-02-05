import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted'
import { Kurs } from "./Kurs";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e157780246fff924e6a3feddd751f201304213b2f845d8841a61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    category: 'user' | 'admin';

    @ManyToMany(t => Kurs)
    @JoinTable({ name: 'slusanje' })
    kursevi: Kurs[];
}
