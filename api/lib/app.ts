import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/invoiceRoutes";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    constructor() {
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
        this.app.use(function (req, res, next) {
          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

          // Request methods you wish to allow
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

          // Request headers you wish to allow
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

          // Set to true if you need the website to include cookies in the requests sent

          // Pass to next layer of middleware
          next();
      });
    }
}

export default new App().app;
