import { Column, Entity, PrimaryKey } from "../src/core/decorators";
import "reflect-metadata"
/* tslint:disable:comment-format */
//@ts-ignore
@Entity("users")
export class UserEntity {
  //@ts-ignore
  @PrimaryKey({
    autoIncrement: false,
    
  })
  //@ts-ignore
  @Column({
    type: "UUID",
    name: "id",
  })
  id: string;

  //@ts-ignore
  @Column({
    type: "TEXT",
    name: "name",
  })
  name: string;

  //@ts-ignore
  @Column({
    type: "TEXT",
    name: "email",
    notNull: true,
  })
  email: string;

  //@ts-ignore
  @Column({
    type: "JSON",
    name: "config",
  })
  config: any;

  //@ts-ignore
  @Column({
    type: "BOOLEAN",
    name: "is_active",
  })
  isActive: boolean;

  //@ts-ignore
  @Column({
    type: "DATE",
    name: "created_at",
  })
  createdAt: Date;

   //@ts-ignore
   @Column({
    type: "INTEGER",
    name: "age",
  })
  age: number;
}
/* tslint:disable:comment-format */
