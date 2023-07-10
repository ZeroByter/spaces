import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class CommentsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM comments WHERE id=$1", [
      id,
    ])) as any;

    return data[0];
  }

  static async getByPostId(postid: string) {
    const data = (await psqlQuery("SELECT * FROM comments WHERE postid=$1", [
      postid,
    ])) as any;

    return data;
  }

  static async create(
    createdby: string,
    postid: string,
    parentid: string | undefined,
    text: string
  ) {
    const newId = randomId();

    await psqlInsert("comments", {
      id: newId,
      createdby,
      postid,
      parentid,
      text,
      timecreated: Date.now(),
    });

    return newId;
  }
}
