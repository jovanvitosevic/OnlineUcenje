import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Kurs } from "./Kurs";


@Entity()
export class Kviz {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @ManyToOne(() => Kurs)
  kurs: Kurs;

}