import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";
import ServerComment from "@/types/serverComment";
import ClientComment from "@/types/clientComment";
import UsersSQL from "./users";

export default class CommentsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM comments WHERE id=$1", [
      id,
    ])) as ServerComment[];

    return data[0];
  }

  static async getByPostId(postid: string) {
    const data = (await psqlQuery("SELECT * FROM comments WHERE postid=$1", [
      postid,
    ])) as ServerComment[];

    return await Promise.all(
      data.map(async (serverComment) => {
        return {
          id: serverComment.id,
          text: serverComment.text,
          createdBy: await UsersSQL.getById(serverComment.createdby),
          timecreated: serverComment.timecreated,
        } as ClientComment;
      })
    );
  }

  static async search(search: string) {
    const data = (await psqlQuery(
      "SELECT * FROM comments WHERE text ILIKE $1",
      [`%${search}%`]
    )) as ServerComment[];

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
