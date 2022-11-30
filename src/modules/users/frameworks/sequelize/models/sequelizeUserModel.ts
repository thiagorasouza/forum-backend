import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table
export class SequelizeUserModel extends Model {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;
}
