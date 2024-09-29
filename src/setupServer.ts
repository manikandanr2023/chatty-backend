import { Application, json, urlencoded, Response, Request, NextFunction } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookierSession from "cookie-session";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import "express-async-errors";
import compression from "compression";
import { config } from "@root/config";
import applicationRoutes from "@root/routes";
import HTTP_STATUS from "http-status-codes";

import Logger from "bunyan";
import { CustomError, IErrorResponse } from "@global/helpers/error-handler";
import bodyParser from "body-parser";

const SERVER_PORT = 5000;
const log: Logger = config.createLogger("Server");
export class ChattyServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  public start(app: Application): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
    this.apiMonitoring(this.app);
    console.log("start");
  }
  private securityMiddleware(app: Application): void {
    app.use(
      cookierSession({
        name: "session",
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 60 * 60 * 1000,
        secure: config.NODE_ENV !== "development"
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
      })
    );
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
  }
  private routeMiddleware(app: Application): void {
    applicationRoutes(app);
  }
  private globalErrorHandler(app: Application): void {
    app.all("*", (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }
  private apiMonitoring(app: Application): void {}

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
      }
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on Port ${SERVER_PORT}`);
    });
  }

  private socketIOConnections(io: Server): void {
    log.info("socketIOConnections");
  }
}
