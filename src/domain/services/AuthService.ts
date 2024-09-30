import bcrypt from "bcrypt";
import AuthUC from "../ports/in/AuthUC";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export default class AuthService implements AuthUC {
  verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
  generateToken(playerId: string): string {
    const payload = { id: playerId };
    return jwt.sign(payload, jwtSecret!, { expiresIn: "1h" });
  }
  verifyToken(token: string) {
    try {
      return jwt.verify(token, jwtSecret!);
    } catch (error) {
      return null;
    }
  }
}
