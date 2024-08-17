import { Player } from "@/domain/models/Player";

export default interface PlayerUC {
  getPlayerById(playerId: string): Promise<Player>;
  getPlayerByUsername(username: string): Promise<Player>;
  getPlayerByEmail(email: string): Promise<Player>;
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
