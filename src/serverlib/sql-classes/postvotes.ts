import { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";

export default class PostVotesSQL {
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
