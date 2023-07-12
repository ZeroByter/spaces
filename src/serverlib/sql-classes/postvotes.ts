import psqlQuery, { psqlDelete, psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class PostVotesSQL {
  static async getVotes(postId: string): Promise<number> {
    const data = (await psqlQuery(
      "SELECT (COUNT(CASE WHEN positive THEN 1 END) - COUNT(CASE WHEN NOT positive THEN 1 END)) AS votes FROM postvotes WHERE postid=$1",
      [postId]
    )) as any[];

    return data[0].votes;
  }

  static async getVote(postId: string, userId: string) {
    const data = (await psqlQuery(
      "SELECT * FROM postvotes WHERE postid=$1 AND userid=$2",
      [postId, userId]
    )) as any[];

    if (data.length == 0) {
      return;
    }

    return data[0];
  }

  static async getVoteAsNumber(postId: string, userId?: string) {
    if (!userId) return 0;

    const data = await this.getVote(postId, userId);

    if (!data) return 0;

    return data.positive ? 1 : -1;
  }

  static async deleteVote(postId: string, userId: string) {
    await psqlDelete("postvotes", {
      postid: postId,
      userid: userId,
    });
  }

  static async create(postid: string, userid: string, positive: boolean) {
    const newId = randomId();

    await psqlInsert("postvotes", {
      id: newId,
      postid,
      userid,
      positive,
      timecreated: Date.now(),
    });

    return newId;
  }
}
