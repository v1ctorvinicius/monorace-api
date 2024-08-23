import { Player } from "@/domain/models/Player";

export default interface PlayerRepository {
  findPlayerByEmail(email: string): Promise<Player | null>;
  findPlayerById(id: string): Promise<Player | null>;
  createPlayer(player: Player): Promise<Player | null>;
}