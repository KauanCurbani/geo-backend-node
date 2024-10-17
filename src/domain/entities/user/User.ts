import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../BaseEntity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
