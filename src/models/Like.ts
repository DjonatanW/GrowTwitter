import { randomUUID } from "crypto";
import { User } from "./User";
import { Tweet } from "./Tweet";

export class Like {
    id: string = randomUUID()
    constructor(
        private _from: User,
        private _tweet: Tweet
    ) { }


    public get from(): User {
        return this._from
    }

    public get tweet(): Tweet {
        return this._tweet
    }
}