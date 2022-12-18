import winston from "winston";

import { CONFIG } from "../config";

const transports = [];
if (CONFIG.ENVIRONMENT !== "development") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      ),
    }),
  );
}
export const Logger = winston.createLogger({
  level: CONFIG.LOGS.level,

  levels: winston.config.npm.levels,

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});
