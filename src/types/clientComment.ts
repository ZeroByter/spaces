import { ClientPostWithSpace } from "./clientPost";
import ClientUser from "./clientUser";

type ClientComment = {
  id: string;
  text: string;
  timecreated: string;
  createdBy: ClientUser;
};

export type ClientCommentWithSpaceAndPost = ClientComment & {
  post: ClientPostWithSpace;
};

export default ClientComment;
