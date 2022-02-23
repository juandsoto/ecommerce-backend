import express from "express";
import envConfig from "./config/env.config";

const app = express();

app.set("PORT", envConfig.PORT || 3001);

app.listen(app.get("PORT"), () => {
  console.log(process.env.PORT);
  console.log(`server listening on port ${app.get("PORT")}`);
});
