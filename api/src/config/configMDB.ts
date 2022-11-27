import dotenv from "dotenv";
dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mycattlelogv1mdb.xc08ugu.mongodb.net/?retryWrites=true&w=majority`;
const MONGO_URI = process.env.MONGO_URI;

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
