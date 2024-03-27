export interface UserBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ProjectBody {
  title: string;
  description: string;
  tags: string;
  codeUrl: string;
  demoUrl: string;
  userid: string;
  screenshot: string;
}

export interface EmailBody {
  name: string;
  email: string;
  phone: string;
  message: string;
  jobRole: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export type ResponseType = Promise<Response<any, Record<string, any>> | undefined>;
