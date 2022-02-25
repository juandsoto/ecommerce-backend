import mongoose, { ConnectOptions } from "mongoose";
import config from "../config";

mongoose.connect(
  config.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  error => {
    if (error) {
      console.log("database connection failed", "\n", { error });
    } else {
      console.log("database connection has been established succesfully");
    }
  }
);
