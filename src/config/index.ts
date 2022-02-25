import { config as dotenv_config } from "dotenv";

dotenv_config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: "mongodb://localhost:27017/ecommerce",
};

export default config;
