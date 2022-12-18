import { createServer } from "http";

import { Logger } from "./logger";
import { CONFIG } from "./config";
import { ConnectToMongo } from "./database";
import { app } from "./";

const startExpressServer = async (PORT: string | undefined) => {
  const { message, success } = await ConnectToMongo();

  if (!success) {
    throw new Error(message);
  }

  Logger.info(`
      ################################################
      🛡️  Database is running in ${CONFIG.ENVIRONMENT} environment🛡️
      ################################################
    `);

  const expressServer = createServer(app);

  expressServer.listen(PORT, () => {
    Logger.info(`
        ################################################
        🛡️  Server listening on port: ${PORT} in ${CONFIG.ENVIRONMENT} environment🛡️
        ################################################
      `);
  });
};

startExpressServer(CONFIG.PORT);
