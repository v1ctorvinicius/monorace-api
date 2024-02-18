import express from "express";
import { router } from "./route/router";
const cors = require("cors");

const dotenv = require("dotenv").config();
const port = process.env.PORT;

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.server.use(cors());
    this.middleware();
    this.router();
  }

  private router() {
    this.server.use(router);
  }

  private middleware() {
    this.server.use(express.json());
  }
}

const app = new App().server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
