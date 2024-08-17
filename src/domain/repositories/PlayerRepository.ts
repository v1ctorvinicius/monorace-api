import { Player } from "@/domain/models/Player";

export default interface PlayerRepository {
  findPlayerByEmail(email: string): Promise<Player>;
}