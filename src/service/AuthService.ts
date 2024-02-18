import { playerService } from "./PlayerService";

class AuthService {
  private static instance: AuthService;

  public async usernameExists(username: string): Promise<boolean> {
    let exists = false;
    await playerService.getPlayer(username).then((data) => {
      console.log("AUTHSERVICE data: ", data);

      if (data) {
        exists = true;
      }
    });
    return exists;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}

export const authService = AuthService.getInstance();
