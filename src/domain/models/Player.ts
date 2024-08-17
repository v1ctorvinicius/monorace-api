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
    rank: string,
    level: number,
    experience: number,
    score: number,
    trophies: string[],
    completedRaces: number,
    achievements: string[],
    inventory: object[],
    preferredCar: string,
    settings: object,
    eventsParticipated: Set<string>,
    friends: Set<number>,
    currentRace: string,
    bestLapTime: number | null,
    totalRaces: number,
    totalWins: number,
    currentEvents: Set<number>,
    directChallenges: Set<number>,
    carType: string,
    customizations: object,
    coins: number
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.rank = rank;
    this.level = level;
    this.experience = experience;
    this.score = score;
    this.trophies = trophies;
    this.completedRaces = completedRaces;
    this.achievements = achievements;
    this.inventory = inventory;
    this.preferredCar = preferredCar;
    this.settings = settings;
    this.eventsParticipated = eventsParticipated;
    this.friends = friends;
    this.currentRace = currentRace;
    this.bestLapTime = bestLapTime;
    this.totalRaces = totalRaces;
    this.totalWins = totalWins;
    this.currentEvents = currentEvents;
    this.directChallenges = directChallenges;
    this.carType = carType;
    this.customizations = customizations;
    this.coins = coins;
  }

  static create(username: string, email: string) {
    return new Player(
      "no-id", // id
      username, // username
      email, // email
      "no avatar", // avatarUrl
      "noCarType", // rank
      0, // level
      0, // experience
      0, // score
      [], // trophies
      0, // completedRaces
      [], // achievements
      [], // inventory
      "no preferred car", // preferredCar
      {}, // settings
      new Set(), // eventsParticipated
      new Set(), // friends
      "no current race", // currentRace
      null, // bestLapTime
      0, // totalRaces
      0, // totalWins
      new Set(), // currentEvents
      new Set(), // directChallenges
      "no car type", // carType
      {}, // customizations
      0 // coins
    );
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

  saveProgress() {}

  loadProgress() {}

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
