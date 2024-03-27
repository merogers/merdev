export interface ProjectInterface {
  screenshot: string;
  userid: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  demoUrl: string;
  codeUrl: string;
  tags: mongoose.Schema.Types.Array;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
