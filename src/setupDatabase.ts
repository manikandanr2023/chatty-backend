import mongoose, { mongo } from "mongoose";
import { config } from "./config";
import Logger from "bunyan";
import { redisConnection } from "@service/redis/redis.connection";
const log: Logger = config.createLogger("setupDatabase");
export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info("Successfully connected to database");
        redisConnection.connect();
      })
      .catch((error) => {
        log.error("Error Connecting to database", error);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
