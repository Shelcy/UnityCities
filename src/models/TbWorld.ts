import { Transform } from "class-transformer";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCities } from "./TbCities";

@Index("PK__TB_World__FDA325ECF0AC3E99", ["idWorld"], { unique: true })
@Index("UQ__TB_World__6EFF4F30694839AF", ["worldName"], { unique: true })
@Entity("TB_World", { schema: "dbo" })
export class TbWorld {
  @Column("varchar", { name: "worldName", unique: true, length: 100 })
  worldName: string;

  @Column("varchar", { name: "welcome", length: 100 })
  welcome: string;

  @Column("int", { name: "uiid" })
  uiid: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id_world" })
  idWorld: number;

  @Column("varchar", { name: "campaign", length: 100 })
  campaign: string;

  @OneToMany(() => TbCities, (tbCities) => tbCities.idWorld)
  tbCities: TbCities[];
}
