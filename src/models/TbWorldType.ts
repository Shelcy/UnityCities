import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__TB_World__CA0DC77069EC24A0", ["idWorldType"], { unique: true })
@Entity("TB_WorldType", { schema: "dbo" })
export class TbWorldType {
  @Column("varchar", { name: "worldMode", length: 50 })
  worldMode: string;

  @PrimaryGeneratedColumn({ type: "int", name: "id_worldType" })
  idWorldType: number;
}
