export default class Leaderboard {
  private raceId: string;
  private eventId: string;
  private players: Array<{
    playerId: number;
    username: string;
    score: number;
    rank: number;
  }>;

  constructor(raceId: string, eventId: string, players: Array<{ playerId: number; username: string; score: number; rank: number }>) {
    this.raceId = raceId;
    this.eventId = eventId;
    this.players = players;
  }

  addPlayer(playerId: number, username: string, score: number, rank: number) {
    this.players.push({ playerId, username, score, rank });
  }

  getPlayers() {
    return this.players;
  }

  getRaceId() {
    return this.raceId;
  }

  getEventId() {
    return this.eventId;
  }
}