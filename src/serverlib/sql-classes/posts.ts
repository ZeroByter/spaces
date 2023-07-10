import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";
import ServerPost from "@/types/serverPost";
import ClientPost from "@/types/clientPost";
import UsersSQL from "./users";

export default class PostsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE id=$1", [
      id,
    ])) as ServerPost[];

    return data[0];
  }

  static async getBySpaceId(spaceId: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE spaceid=$1", [
      spaceId,
    ])) as ServerPost[];

    return data;
  }

  static async clientGetBySpaceId(spaceId: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE spaceid=$1", [
      spaceId,
    ])) as ServerPost[];

    return await Promise.all(
      data.map(async (serverPost) => {
        return {
          id: serverPost.id,
          createdBy: await UsersSQL.clientGetById(serverPost.createdby),
          title: serverPost.title,
          text: serverPost.text,
          timecreated: serverPost.timecreated,
          spaceid: serverPost.spaceid,
          navtext: serverPost.navtext,
        } as ClientPost;
      })
    );
  }

  static async getLatestGlobal() {
    const data = (await psqlQuery("SELECT * FROM posts", [])) as ServerPost[];

    return await Promise.all(
      data.map(async (serverPost) => {
        return {
          id: serverPost.id,
          createdBy: await UsersSQL.clientGetById(serverPost.createdby),
          title: serverPost.title,
          text: serverPost.text,
          timecreated: serverPost.timecreated,
          spaceid: serverPost.spaceid,
          navtext: serverPost.navtext,
        } as ClientPost;
      })
    );
  }

  static async getByNavText(searchNavtext: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE navtext=$1", [
      searchNavtext,
    ])) as ServerPost[];

    const { id, createdby, title, text, timecreated, spaceid, navtext } =
      data[0];

    return {
      id,
      createdBy: await UsersSQL.clientGetById(createdby),
      title,
      text,
      timecreated,
      spaceid,
      navtext,
    } as ClientPost;
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
