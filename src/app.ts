import { authenticateUser } from "./adapters/in/http/controllers/AuthController";

import express from "express";
const cors = require("cors");

// const dotenv = require("dotenv").config();
const port = process.env.PORT;

class App {
  public server: express.Application;

  private routes() {
    this.server.get("/login", authenticateUser);
  }

  constructor() {
    this.server = express();
    this.server.use(cors());
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.server.use(express.json());
  }
}

const app = new App().server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
