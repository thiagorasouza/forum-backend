import { Table, Column, Model } from "sequelize-typescript";

@Table
export class SequelizeUserModel extends Model {
  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;
}
