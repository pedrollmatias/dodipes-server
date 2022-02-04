declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number;
    MONGODB_URI?: string;
    JWT_SECRET: string;
  }
}
