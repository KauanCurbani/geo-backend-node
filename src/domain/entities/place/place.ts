import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../BaseEntity";

@Entity({ name: "places" })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  country: string;
  @Column({ nullable: true })
  state: string;
  @Column({ nullable: true })
  stateCode: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  postalCode: string;
  @Column({ nullable: true })
  suburb: string;
  @Column({ nullable: true })
  street: string;
  @Column({ nullable: true })
  houseNumber: string;
  @Column({ type: "float" })
  lng: number;
  @Column({ type: "float" })
  lat: number;
  @Column({ nullable: true })
  formattedAddress: string;
  @Column({ nullable: true })
  openHours: string;
}
