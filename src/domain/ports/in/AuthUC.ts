export default interface AuthUC {
  verifyPassword(password: string, hash: string): boolean;
  hashPassword(password: string): string;
  generateToken(playerId: string): string;
  verifyToken(token: string): any;
}
