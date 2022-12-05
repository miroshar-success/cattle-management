import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
  },
};

// module.exports = config;
