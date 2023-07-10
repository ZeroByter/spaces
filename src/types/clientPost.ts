import ClientComment from "./clientComment";
import ClientUser from "./clientUser";

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

export default ClientPost;
