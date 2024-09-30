import { Player } from "@/domain/models/Player";

export default interface PlayerRepository {
  findByEmail(email: string): Promise<Player | null>;
  findIdByEmail(email: string): Promise<string | null>;
  findById(id: string): Promise<Player | null>;
  create(player: Player): Promise<Player | null>;
  findById(id: string): Promise<Player | null>;
  findByName(name: string): Promise<Player[]>;
  findByTeam(team: string): Promise<Player[]>;
  findByPosition(position: string): Promise<Player[]>;
  findByNationality(nationality: string): Promise<Player[]>;
}
