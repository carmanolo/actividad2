"use strict";
import { EntitySchema } from "typeorm";

const TeamSchema = new EntitySchema({
  name: "team",
  tableName: "teams",
  columns: {
    id_team: {
      type: "int",
      primary: true,
      generated: true,
    },
    name_team: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    country: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    trophies: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  }
});

export default TeamSchema;