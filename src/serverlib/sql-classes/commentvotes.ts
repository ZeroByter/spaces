import psqlQuery, { psqlDelete, psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class CommentVotesSQL {
  static async getVotes(commentId: string): Promise<number> {
    const data = (await psqlQuery(
      "SELECT (COUNT(CASE WHEN positive THEN 1 END) - COUNT(CASE WHEN NOT positive THEN 1 END)) AS votes FROM commentvotes WHERE commentid=$1",
      [commentId]
    )) as any[];

    return data[0].votes;
  }

  static async deleteVote(postId: string, userId: string) {
    await psqlDelete("commentvotes", {
      postid: postId,
      userid: userId,
    });
  }

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
