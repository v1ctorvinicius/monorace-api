import { authenticateUser } from "./adapters/in/http/controllers/AuthController";
import { router } from "@/adapters/in/http/routes/router";

import express from "express";
const cors = require("cors");

// const dotenv = require("dotenv").config();
const port = process.env.PORT;

class App {
  public server: express.Application;

  private routes() {
    this.server.use("/api", router);
  }

  constructor() {
    this.server = express();
    this.server.use(cors());
    this.middleware();
    this.routes();
  }

  private router() {
    this.server.use("/api");
  }

  private middleware() {
    this.server.use(express.json());
  }
}

const app = new App().server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
