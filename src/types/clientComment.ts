import ClientUser from "./clientUser";

type ClientComment = {
  id: string;
  text: string;
  timecreated: string;
  createdBy: ClientUser;
};

export default ClientComment;
