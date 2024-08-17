import router from "@/adapters/in/http/routes/router";

import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.server.use(cors());
    this.middleware();
    this.routes();
  }

  private routes() {
    this.server.use("/api", router);
  }

  private middleware() {
    this.server.use(express.json());
  }
}

const app = new App().server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
