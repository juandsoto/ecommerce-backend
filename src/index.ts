import express from "express";
import morgan from "morgan";
import config from "./config";
import "./db/connection";
import routes from "./router";

const app = express();

app.set("PORT", config.PORT || 3001);

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", routes);

app.listen(app.get("PORT"), () => {
  console.log(`server listening on port ${app.get("PORT")}`);
});
