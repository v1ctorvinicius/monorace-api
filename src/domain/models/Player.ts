export class Player {
  private id: string;
  private username: string;
  private email: string;
  private avatarUrl: string;
  private rank: string;
  private level: number;
  private experience: number;
  private score: number;
  private trophies: string[];
  private completedRaces: number;
  private achievements: string[];
  private inventory: object[];
  private preferredCar: string;
  private settings: object;
  private eventsParticipated: Set<string>;
  private friends: Set<number>;
  private currentRace?: string;
  private bestLapTime: number | null;
  private totalRaces: number;
  private totalWins: number;
  private currentEvents: Set<number>;
  private directChallenges: Set<number>;
  private carType: string;
  private customizations: object;
  private coins: number;

  constructor(
    id: string,
    username: string,
    email: string,
    avatarUrl: string,
    carType: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.rank = "Novice";
    this.level = 1;
    this.experience = 0;
    this.score = 0;
    this.trophies = [];
    this.completedRaces = 0;
    this.achievements = [];
    this.inventory = [];
    this.preferredCar = "";
    this.settings = {};
    this.eventsParticipated = new Set();
    this.friends = new Set();
    this.bestLapTime = null;
    this.totalRaces = 0;
    this.totalWins = 0;
    this.currentEvents = new Set();
    this.directChallenges = new Set();
    this.carType = carType;
    this.customizations = {};
    this.coins = 0;
  }

  updateRank(newRank: string) {
    this.rank = newRank;
  }

  levelUp() {
    this.level += 1;
    this.experience = 0;
  }

  addExperience(points: number) {
    this.experience += points;
    if (this.experience >= 1000) {
      this.levelUp();
    }
  }

  addScore(points: number) {
    this.score += points;
  }

  completeRace() {
    this.completedRaces += 1;
  }

  joinEvent(eventId: string) {
    this.eventsParticipated.add(eventId);
  }

  addFriend(friendId: number) {
    this.friends.add(friendId);
  }

  removeFriend(friendId: number) {
    this.friends.delete(friendId);
  }

  recordRaceResult(time: number, win: boolean) {
    if (this.bestLapTime === null || time < this.bestLapTime) {
      this.bestLapTime = time;
    }
    this.totalRaces += 1;
    if (win) this.totalWins += 1;
  }

  setCarType(type: string) {
    this.carType = type;
  }

  sendChallenge(otherPlayerId: number) {
    this.directChallenges.add(otherPlayerId);
  }

  customizeCar(options: object) {
    this.customizations = { ...this.customizations, ...options };
  }

  addItemToInventory(item: object) {
    this.inventory.push(item);
  }

  setPreferredCar(car: string) {
    this.preferredCar = car;
  }

  updateSettings(newSettings: object) {
    this.settings = { ...this.settings, ...newSettings };
  }

  unlockAchievement(achievementId: string) {
    if (!this.achievements.includes(achievementId)) {
      this.achievements.push(achievementId);
    }
  }

  useItem(item: object) {
    const index = this.inventory.indexOf(item);
    if (index > -1) {
      this.inventory.splice(index, 1);
    }
  }

  saveProgress() {
    // Implementar lógica para salvar progresso no banco de dados ou servidor
  }

  loadProgress() {
    // Implementar lógica para carregar progresso do banco de dados ou servidor
  }

  getProfile() {
    return {
      id: this.id,
      username: this.username,
      level: this.level,
      rank: this.rank,
      score: this.score,
      completedRaces: this.completedRaces,
      eventsParticipated: Array.from(this.eventsParticipated),
      friends: Array.from(this.friends),
    };
  }
}
