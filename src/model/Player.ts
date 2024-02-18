export default class Player {
  [x: string]: any;
  private _id: number;
  private _username: string;

  constructor(name: string) {
    this._username = name;
    this._id = Math.floor(Math.random() * 1000);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._username;
  }
}