import crypto from "crypto";
import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";
import ServerSpace from "@/types/serverSpace";

export default class SpacesSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM spaces WHERE id=$1", [
      id,
    ])) as ServerSpace[];

    return data[0];
  }

  static async getByTechName(techname: string) {
    const data = (await psqlQuery("SELECT * FROM spaces WHERE techname=$1", [
      techname,
    ])) as ServerSpace[];

    return data[0];
  }

  static async search(search: string) {
    const data = (await psqlQuery(
      "SELECT * FROM spaces WHERE name ILIKE $1 ORDER BY timecreated DESC",
      [`%${search}%`]
    )) as ServerSpace[];

    return data;
  }

  static async create(name: string, techname: string) {
    const newId = randomId();

    await psqlInsert("spaces", {
      id: newId,
      name,
      techname,
      timecreated: Date.now(),
    });

    return newId;
  }
}
