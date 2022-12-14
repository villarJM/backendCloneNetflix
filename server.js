const express = require("express");
const cloneNetflixRouter = require("./routes/clonenetflix");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      clonenetflix: "/api/v1/clonenetflix"
    };
    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use(this.paths.clonenetflix, cloneNetflixRouter);
  }

  middleware() {
    this.app.use(cors()); //Habilita Origen Cruzado
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

module.exports = Server
