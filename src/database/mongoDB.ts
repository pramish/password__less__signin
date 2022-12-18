import mongoose, { Mongoose } from "mongoose";

import { CONFIG } from "../config";

export const ConnectToMongo = async () => {
  try {
    const dbConnection: Mongoose = await mongoose.connect(`${CONFIG.DATABASE_URL}`);

    if (!dbConnection) {
      return {
        success: false,
        message: "Couldn't connect to the database",
      };
    }

    return {
      success: true,
      message: `Connected to MONGODB in ${CONFIG.ENVIRONMENT} environment`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
