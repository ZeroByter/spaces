import crypto from "crypto";
import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class SpacesSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM spaces WHERE id=$1", [
      id,
    ])) as any;

    return data[0];
  }

  static async create(name: string) {
    const newId = randomId();

    await psqlInsert("spaces", {
      id: newId,
      name,
      timecreated: Date.now(),
    });

    return newId;
  }
}
