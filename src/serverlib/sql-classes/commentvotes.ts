import { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class CommentVotesSQL {
  static async create(commentid: string, userid: string, positive: boolean) {
    const newId = randomId();

    await psqlInsert("commentvotes", {
      id: newId,
      commentid,
      userid,
      positive,
      timecreated: Date.now(),
    });

    return newId;
  }
}
