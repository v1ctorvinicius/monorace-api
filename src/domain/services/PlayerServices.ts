import { PlayerRepositoryRedisImpl } from "@/adapters/out/db/PlayerRepositoryRedisImpl";
import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Player } from "../models/Player";
import PlayerRepository from "../ports/out/PlayerRepository";
import AuthService from "@/domain/services/AuthService";

export class PlayerServices implements PlayerUC {
  private playerRepository: PlayerRepository;
  private authService: AuthService;

  constructor(playerRepository: PlayerRepository, authService: AuthService) {
    this.playerRepository = playerRepository;
    this.authService = authService;
  }

  async getPlayerById(playerId: string): Promise<Player | null> {
    return await this.playerRepository.findById(playerId);
  }

  async getPlayerIdByEmail(email: string): Promise<string | null> {
    return await this.playerRepository.findIdByEmail(email);
  }

  async playerSignUp(request: any): Promise<Player | null> {
    const player = Player.create(
      request.newUsername,
      this.authService.hashPassword(request.newPassword),
      request.newEmail
    );

    if (!player) return null;

    if (await this.playerRepository.findIdByEmail(player.getEmail()))
      throw new Error("Sorry, email already in use");

    return await this.playerRepository.create(player);
  }

  async playerLogin(email: string, password: string): Promise<string | null> {
    const player = await this.playerRepository.findByEmail(email);

    if (!player) throw new Error("Email not found");

    const isPasswordValid = await this.authService.verifyPassword(
      password,
      player.getPasswordHash()
    );
    if (!isPasswordValid) return null;

    const token = this.authService.generateToken(player.getId());
    return token;
  }

  getPlayerByUsername(username: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getPlayerStatisticsById(playerId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getLeaderboard(raceId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getEventLeaderboard(eventId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  sendFriendRequestWithId(friendId: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  removeFriendWithId(friendId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  sendChallengeWithId(playerId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  acceptChallengeWithId(challengeId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  declineChallengeWithId(challengeId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  acceptFriendRequestWithId(requestId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  declineFriendRequestWithId(requestId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  registerInEventWithId(eventId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  useItem(itemName: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getInventory(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getTrophies(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
