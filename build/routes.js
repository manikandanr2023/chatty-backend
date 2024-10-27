"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./shared/globals/helpers/auth-middleware");
const currentRoutes_1 = require("./features/auth/routes/currentRoutes");
const authRoutes_1 = require("./features/auth/routes/authRoutes");
const base_queue_1 = require("./shared/services/queues/base.queue");
const postRoutes_1 = require("./features/post/routes/postRoutes");
const BASE_PATH = "/api/v1";
exports.default = (app) => {
    const routes = () => {
        app.use("/queues", base_queue_1.serverAdapter.getRouter());
        app.use(BASE_PATH, authRoutes_1.authRoutes.routes());
        app.use(BASE_PATH, authRoutes_1.authRoutes.signOutRoute());
        app.use(BASE_PATH, auth_middleware_1.authMiddleware.verifyUser, currentRoutes_1.currentUserRoutes.routes());
        app.use(BASE_PATH, auth_middleware_1.authMiddleware.verifyUser, postRoutes_1.postRoutes.routes());
    };
    routes();
};
//# sourceMappingURL=routes.js.map