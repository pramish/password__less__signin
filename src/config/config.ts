import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.ENVIRONMENT,
  LOGS: {
    level: "silly",
  },
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SCHOOL_CLIENT_URL: process.env.SCHOOL_CLIENT_URL,
  EMAIL: process.env.EMAIL,
  SECRET: process.env.SECRET,
  AWS_KEY: process.env.AWS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  REGION: process.env.REGION,
  AWS_API_VERSION: process.env.AWS_API_VERSION,
  SERVER_URL: `${process.env.SERVER_URL}:${process.env.PORT}`,
  PASSPORT_LOGIN_SECRET: process.env.PASSPORT_LOGIN_SECRET || "",
};
