type ServerUser = {
  id: string;
  username: string;
  password: string;
  email?: string;
  timecreated: string;
  admin: boolean;
};

export default ServerUser;
