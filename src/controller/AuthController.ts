import { Request, Response } from "express";
import { authService } from "../service/AuthService";

class AuthController {
  private static instance: AuthController;

  public login() {}

  public usernameExists(req: Request, res: Response) {
    const username = req.params.username;
    authService.usernameExists(username).then((data) => {
      res.json({ exists: data });
    });
  }

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }
}

export const authController = AuthController.getInstance();
