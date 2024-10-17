import { Column, Entity, JoinColumn, ManyToOne, Polygon, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../BaseEntity";
import { Docking } from "../docking/docking";

@Entity({ name: "areas" })
export class Area extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({ type: "geometry", spatialFeatureType: "Polygon", srid: 4326 })
  polygon: Polygon;
  @Column()
  color: string;
  @ManyToOne(() => Docking, (docking) => docking.areas)
  @JoinColumn()
  docking: Docking;
}
