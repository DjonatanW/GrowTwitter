import { randomUUID } from 'crypto';
import { Tweet } from './Tweet';
import { users } from '../databases/user';
import { tweets } from '../databases/tweet';

export class User {
    private _id: string = randomUUID()
    private _followers: User[] = []
    private _tweets: Tweet[] = []

    constructor(
        private _name: string,
        private _username: string,
        private _email: string,
        private _password: string,
    ) {
    }

    public get name(): string {
        return this._name
    }
    public get username(): string {
        return this._username
    }
    public get email(): string {
        return this._email
    }
    public get password(): string {
        return this.password
    }
    public get id(): string {
        return this._id
    }
    public get followers(): User[] {
        return this._followers
    }
    public get tweets(): Tweet[] {
        return this._tweets
    }

    public sendTweet(newTweet: Tweet): void {
        if (newTweet.user._username != this._username) {
            throw Error("It is not possible to add or send a tweet.")
        }
        if (newTweet.type !== "Normal") {
            throw new Error("Invalid reply type. Type must be 'Normal'");
        }
        tweets.push(newTweet)

    }

    public follow(followers: User) {
        if (followers._username === this._username) {
            throw Error("Can't follow your")
        }
        this._followers.push(followers)
    }

    public showFollowers(): void {
        console.log(`FOLLOWERS OF ${this._username.toLocaleUpperCase()}\n------------------------------------\n`);
        this._followers.forEach(follow => {
            console.log("Username: ", follow._username, "\n------------------------------------");

        })
    }

    public showFeed(): void {
        this.showTweet()
    }

    private showTweet() {

        console.log(`________________________\n\n-- TWEETS FEED ${this._username.toLocaleUpperCase()}  -- \n________________________`);

        const tweetsUserLogged = tweets.filter(tweet => this._id === tweet.user._id)
        tweetsUserLogged.forEach(tweet => {
            tweet.show(tweet, this._followers);

        });

        const followedUserIds = this._followers.map(follower => follower.id);

        const tweetsToShow = tweets.filter(tweet => followedUserIds.includes(tweet.user.id) && tweet.user.id !== this.id);

        tweetsToShow.forEach(tweet => {
            tweet.show(tweet, this._followers);
        });


    }
    private validateData(): void {
        this.checkPassword()
        this.checkUsername()
        this.checkEmail()
    }

    private checkPassword() {

        var passwordValidator = require('password-validator');

        var schema = new passwordValidator();

        schema.is().min(8)
        schema.has().uppercase()
        schema.has().lowercase()
        schema.has().digits(2)


        if (!schema.validate(this._password)) {
            throw new Error("The password must have no capital letters, 2 numbers and at least 8 characters in total");

        }

    }

    private checkUsername(): void {
        const existsUsername = users.some((user) => user.username === this.username);

        if (existsUsername) {
            throw Error('This username already exists')
        }
    }

    private checkEmail(): void {
        const existsEmail = users.some((user) => user.email === this.email)

        if (existsEmail) {
            throw Error('This email already exists registered')
        }
    }

    public createUsers(newUser: User): void {
        this.validateData()
        users.push(newUser)
    }
}