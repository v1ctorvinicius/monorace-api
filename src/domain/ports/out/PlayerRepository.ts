import { Player } from "@/domain/models/Player";

export default interface PlayerRepository {
  findById(id: string): Promise<Player | null>;
  findByName(name: string): Promise<Player[]>;
  findByTeam(team: string): Promise<Player[]>;
  findByPosition(position: string): Promise<Player[]>;
  findByNationality(nationality: string): Promise<Player[]>;


}