import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class PostsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE id=$1", [
      id,
    ])) as any;

    return data[0];
  }

  static async getBySpaceId(spaceId: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE spaceid=$1", [
      spaceId,
    ])) as any;

    return data;
  }

  static async getLatestGlobal() {
    const data = (await psqlQuery("SELECT * FROM posts", [])) as any;

    return data;
  }

  static async getByNavText(navtext: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE navtext=$1", [
      navtext,
    ])) as any;

    return data[0];
  }

  static async create(
    createdby: string,
    spaceid: string,
    title: string,
    text: string,
    navtext: string
  ) {
    const newId = randomId();

    await psqlInsert("posts", {
      id: newId,
      createdby,
      spaceid,
      title,
      text,
      timecreated: Date.now(),
      navtext,
    });

    return newId;
  }
}
