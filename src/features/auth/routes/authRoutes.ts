<<<<<<< HEAD
=======
import { Password } from "@auth/controllers/password";
>>>>>>> 2fbf8b2 (feat: implemented password reset feature with unit test)
import { SignIn } from "@auth/controllers/signin";
import { SignOut } from "@auth/controllers/signout";
import { SignUp } from "@auth/controllers/signup";
import express, { Router } from "express";
class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.post("/signup", SignUp.prototype.create);
    this.router.post("/signin", SignIn.prototype.read);
<<<<<<< HEAD
=======
    this.router.post("/forgot-password", Password.prototype.create);
    this.router.post("/reset-password/:token", Password.prototype.update);
>>>>>>> 2fbf8b2 (feat: implemented password reset feature with unit test)
    return this.router;
  }
  public signOutRoute(): Router {
    this.router.get("/signout", SignOut.prototype.update);
    return this.router;
  }
}
export const authRoutes: AuthRoutes = new AuthRoutes();
