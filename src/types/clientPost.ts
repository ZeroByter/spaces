import ClientComment from "./clientComment";
import ClientUser from "./clientUser";
import ServerSpace from "./serverSpace";

type ClientPost = {
  id: string;
  createdBy: ClientUser;
  title: string;
  text: string;
  timecreated: string;
  spaceid: string;
  navtext: string;
};

export type ClientPostWithComments = ClientPost & {
  comments: ClientComment[];
};

export type ClientPostWithSpace = ClientPost & {
  space: ServerSpace;
};

export default ClientPost;
