import { PlayerSignUpRequest } from "@/adapters/in/http/controllers/PlayerController";
import { Player } from "@/domain/models/Player";

export default interface PlayerUC {
  playerLogin(email: string, password: string): Promise<string | null>;
  playerSignUp(request: PlayerSignUpRequest): Promise<Player | null>;
  getPlayerById(playerId: string): Promise<Player | null>;
  getPlayerByUsername(username: string): Promise<Player | null>;
  getPlayerIdByEmail(email: string): Promise<string | null>;
  getPlayerStatisticsById(playerId: string): Promise<string>;
  getLeaderboard(raceId: string): Promise<any>;
  getEventLeaderboard(eventId: string): Promise<any>;
  sendFriendRequestWithId(friendId: string): Promise<Player>;
  removeFriendWithId(friendId: string): Promise<any>;
  sendChallengeWithId(playerId: string): Promise<any>;
  acceptChallengeWithId(challengeId: string): Promise<any>;
  declineChallengeWithId(challengeId: string): Promise<any>;
  acceptFriendRequestWithId(requestId: string): Promise<any>;
  declineFriendRequestWithId(requestId: string): Promise<any>;
  registerInEventWithId(eventId: string): Promise<any>;
  useItem(itemName: string): Promise<any>;
  getInventory(): Promise<any>;
  getTrophies(): Promise<any>;
}
