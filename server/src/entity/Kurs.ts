import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Kurs {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;
}