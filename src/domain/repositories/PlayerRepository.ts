import { Player } from "@/domain/models/Player";

export default interface PlayerRepository {
  findPlayerIdByEmail(email: string): Promise<string | null>;
  findPlayerById(id: string): Promise<Player | null>;
  createPlayer(player: Player): Promise<Player | null>;
}
