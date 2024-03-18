declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_URI: string;
      JWT_SECRET: string;
      AWS_REGION: string;
      AWS_SES_TO: string;
      AWS_SES_FROM: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
  // namespace Express {
  //   interface Request extends ExpressRequest {
  //     user?: string | undefined;
  //     file?: File | undefined;
  //   }
  // }
}
