import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbBuildings } from "./TbBuildings";
import { TbWorld } from "./TbWorld";

@Index("PK__TB_Citie__6AEC3C6146FEE32E", ["idCity"], { unique: true })
@Entity("TB_Cities", { schema: "dbo" })
export class TbCities {
  @Column("varchar", { name: "cityName", length: 100 })
  cityName: string;

  @Column("int", { name: "style" })
  style: number;

  @Column("int", { name: "main" })
  main: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id_city" })
  idCity: number;

  @OneToMany(() => TbBuildings, (tbBuildings) => tbBuildings.idCity)
  tbBuildings: TbBuildings[];

  @ManyToOne(() => TbWorld, (tbWorld) => tbWorld.tbCities)
  @JoinColumn([{ name: "id_world", referencedColumnName: "idWorld" }])
  idWorld: TbWorld | any;
}
