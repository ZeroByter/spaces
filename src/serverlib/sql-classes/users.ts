import crypto from "crypto";
import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";
import ServerUser from "@/types/serverUser";
import ClientUser from "@/types/clientUser";

export default class UsersSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM users WHERE id=$1", [
      id,
    ])) as ServerUser[];

    return data[0];
  }

  static async clientGetById(id: string) {
    const data = (await psqlQuery(
      "SELECT id,username,admin FROM users WHERE id=$1",
      [id]
    )) as ClientUser[];

    return data[0];
  }

  static async getByUsername(username: string) {
    const data = (await psqlQuery(
      "SELECT * FROM users WHERE LOWER(username)=LOWER($1)",
      [username]
    )) as ServerUser[];

    return data[0];
  }

  static async getByUsernameAndPassword(username: string, password: string) {
    const data = (await psqlQuery(
      `SELECT * FROM users WHERE LOWER("username")=LOWER($1) AND "password"=(SUBSTRING("password"::TEXT FROM 0 FOR 65) || encode(sha256(SUBSTRING("password"::BYTEA FROM 0 FOR 65) || $2), 'hex'));`,
      [username, password]
    )) as ServerUser[];

    return data[0];
  }

  static async search(search: string) {
    const data = (await psqlQuery(
      "SELECT id,username,admin FROM users WHERE username ILIKE $1",
      [`%${search}%`]
    )) as ClientUser[];

    return data;
  }

  static async create(username: string, password: string, email?: string) {
    const newId = randomId();

    let hash = randomId(64);

    await psqlInsert("users", {
      id: newId,
      username,
      password: `${hash}${crypto
        .createHash("sha256")
        .update(hash + password)
        .digest("hex")}`,
      email,
      timecreated: Date.now(),
      admin: false,
    });

    return newId;
  }
}
