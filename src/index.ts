import express from "express";
import config from "./config";
import "./db/connection";

const app = express();

app.use(express.json());
app.set("PORT", config.PORT || 3001);

app.listen(app.get("PORT"), () => {
  console.log(`server listening on port ${app.get("PORT")}`);
});
