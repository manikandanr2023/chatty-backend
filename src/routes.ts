import { authMiddleware } from "./shared/globals/helpers/auth-middleware";
import { currentUserRoutes } from "@auth/routes/currentRoutes";
import { authRoutes } from "@auth/routes/authRoutes";
import { serverAdapter } from "@service/queues/base.queue";
import { Application } from "express";
import { postRoutes } from "@post/routes/postRoutes";
import { reactionRoutes } from "@reaction/routes/reactionRoutes";
import { commentRoutes } from "@comment/routes/commentRoutes";
const BASE_PATH = "/api/v1";
export default (app: Application) => {
  const routes = () => {
    app.use("/queues", serverAdapter.getRouter());
    app.use(BASE_PATH, authMiddleware.verifyUser, reactionRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signOutRoute());
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, postRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, commentRoutes.routes());
  };
  routes();
};
