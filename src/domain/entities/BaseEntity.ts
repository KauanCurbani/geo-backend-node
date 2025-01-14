import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
