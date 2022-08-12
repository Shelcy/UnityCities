import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TbCities } from "./TbCities";

@Index("PK__TB_Build__73748C44040C0F99", ["idBuildings"], { unique: true })
@Entity("TB_Buildings", { schema: "dbo" })
export class TbBuildings {
  @Column("varchar", { name: "buildingName", length: 100 })
  buildingName: string;

  @Column("varchar", { name: "description", length: 100 })
  description: string;

  @Column("varchar", { name: "url", length: 250 })
  url: string;

  @PrimaryGeneratedColumn({ type: "int", name: "id_buildings" })
  idBuildings: number;

  @ManyToOne(() => TbCities, (tbCities) => tbCities.tbBuildings)
  @JoinColumn([{ name: "id_city", referencedColumnName: "idCity" }])
  idCity: TbCities | any;
}
