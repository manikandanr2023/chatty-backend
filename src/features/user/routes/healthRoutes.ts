import HTTP_STATUS from "http-status-codes";
import express, { Router, Request, Response } from "express";
import moment from "moment";
import { config } from "@root/config";
import axios from "axios";

class HealthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public health(): Router {
    this.router.get("/health", (req: Request, res: Response) => {
      res
        .status(HTTP_STATUS.OK)
        .send(`Health: Server instance is healthy with process id ${process.pid} on ${moment().format("LL")} testing`);
    });
    return this.router;
  }

  public env(): Router {
    this.router.get("/env", (req: Request, res: Response) => {
      res.status(HTTP_STATUS.OK).send(`This is the ${config.NODE_ENV} environmen.`);
    });
    return this.router;
  }

  public instance(): Router {
    this.router.get("/instance", async (req: Request, res: Response) => {
      const tokenResponse = await axios({
        method: "PUT",
        url: "http://169.254.169.254/latest/api/token",

        headers: { "X-aws-ec2-metadata-token-ttl-seconds": "21600" } // Token valid for 6 hours
      });
      const token = tokenResponse.data;

      const response = await axios({
        method: "get",
        url: config.EC2_URL,
        headers: { "X-aws-ec2-metadata-token": token }

        headers: { "X-aws-ec2-metadata-token-ttl-seconds": "21600" }, // Token valid for 6 hours
      });
      const token = tokenResponse.data;
      console.log(token);
      const response = await axios({
        method: "get",
        url: config.EC2_URL,
        headers: { "X-aws-ec2-metadata-token": token },

      });
      res
        .status(HTTP_STATUS.OK)
        .send(`Server is running on EC2 instance with id ${response.data} and process id ${process.pid} on ${moment().format("LL")}`);
    });
    return this.router;
  }
  public fiboRoutes(): Router {
    this.router.get("/fibo/:num", async (req: Request, res: Response) => {
      const { num } = req.params;
      const start: number = performance.now();
      const result: number = this.fibo(parseInt(num, 10));
      const end: number = performance.now();
      const response = await axios({
        method: "get",
        url: config.EC2_URL
      });
      res
        .status(HTTP_STATUS.OK)
        .send(
          `Fibonacci series of ${num} is ${result} and it took ${end - start}ms and runs with process id ${process.pid} on ${
            response.data
          } at ${moment().format("LL")}`
        );
    });
    return this.router;
  }

  private fibo(data: number): number {
    if (data < 2) {
      return 1;
    } else {
      return this.fibo(data - 2) + this.fibo(data - 1);
    }
  }
}

export const healthRoutes: HealthRoutes = new HealthRoutes();
