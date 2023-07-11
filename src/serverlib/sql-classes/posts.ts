import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/serverlib/essentials";
import ServerPost from "@/types/serverPost";
import ClientPost, { ClientPostWithSpace } from "@/types/clientPost";
import UsersSQL from "./users";
import SpacesSQL from "./spaces";

export default class PostsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE id=$1", [
      id,
    ])) as ServerPost[];

    return data[0];
  }

  static async getBySpaceId(spaceId: string): Promise<ClientPostWithSpace[]> {
    const data = (await psqlQuery("SELECT * FROM posts WHERE spaceid=$1", [
      spaceId,
    ])) as ServerPost[];

    return await Promise.all(
      data.map(async (serverPost) => {
        return {
          id: serverPost.id,
          createdBy: await UsersSQL.clientGetById(serverPost.createdby),
          space: await SpacesSQL.getById(serverPost.spaceid),
          title: serverPost.title,
          text: serverPost.text,
          timecreated: serverPost.timecreated,
          spaceid: serverPost.spaceid,
          navtext: serverPost.navtext,
        };
      })
    );
  }

  static async clientGetWithSpace(
    id: string
  ): Promise<ClientPostWithSpace | undefined> {
    const data = (await psqlQuery("SELECT * FROM posts WHERE id=$1", [
      id,
    ])) as ServerPost[];

    if (data.length == 0) return;

    const serverPost = data[0];

    return {
      ...serverPost,
      createdBy: await UsersSQL.clientGetById(serverPost.createdby),
      space: await SpacesSQL.getById(serverPost.spaceid),
    };
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

  static async getLatestGlobal(): Promise<ClientPostWithSpace[]> {
    const data = (await psqlQuery("SELECT * FROM posts", [])) as ServerPost[];

    return await Promise.all(
      data.map(async (serverPost) => {
        return {
          id: serverPost.id,
          createdBy: await UsersSQL.clientGetById(serverPost.createdby),
          space: await SpacesSQL.getById(serverPost.spaceid),
          title: serverPost.title,
          text: serverPost.text,
          timecreated: serverPost.timecreated,
          spaceid: serverPost.spaceid,
          navtext: serverPost.navtext,
        };
      })
    );
  }

  static async getByNavText(searchNavtext: string) {
    const data = (await psqlQuery("SELECT * FROM posts WHERE navtext=$1", [
      searchNavtext,
    ])) as ServerPost[];

    if (data.length == 0) return;

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

  static async search(search: string): Promise<ClientPostWithSpace[]> {
    const data = (await psqlQuery(
      "SELECT * FROM posts WHERE title ILIKE $1 OR text ILIKE $1",
      [`%${search}%`]
    )) as ServerPost[];

    return await Promise.all(
      data.map(async (post) => ({
        ...post,
        space: await SpacesSQL.getById(post.spaceid),
        createdBy: await UsersSQL.clientGetById(post.createdby),
      }))
    );
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
