type ServerComment = {
  id: string;
  createdby: string;
  postid: string;
  text: string;
  timecreated: string;
  parentid?: string;
};

export default ServerComment;
