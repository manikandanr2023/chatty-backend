import express, { Express } from "express";
import { ChattyServer } from "@root/setupServer";
import databaseConnection from "@root/setupDatabase";
import { config } from "@root/config";
class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const Server: ChattyServer = new ChattyServer(app);
    Server.start(app);
  }
  private loadConfig(): void {
    config.validateConfig();
    //calling CloudinaryCOnfig to run the function
    config.cloudinaryConfig();
  }
}
const application: Application = new Application();

application.initialize();
