import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../BaseEntity";
import { Area } from "../area/area";

@Entity({ name: "docking" })
export class Docking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({ type: "float" })
  lat: number;
  @Column({ type: "float" })
  lng: number;
  @OneToMany(() => Area, (area) => area.docking)
  areas: Area[];
}
