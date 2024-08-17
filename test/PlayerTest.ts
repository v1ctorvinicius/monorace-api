// import { PlayerService } from '../src/PlayerService'; // ajuste o caminho conforme necessário
import { getPlayerByEmailService } from "../src/domain/services/PlayerServices";

describe("PlayerService", () => {
  it("deve encontrar um jogador pelo email", async () => {
    const email = "test@example.com";
    const expectedPlayer = {
      id: 1,
      name: "Test Player",
      email: "test@example.com",
    };

    const player = await getPlayerByEmailService(email);

    expect(player).toEqual(expectedPlayer);
  });
});
