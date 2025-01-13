import { Tweet } from "./models/Tweet";
import { User } from "./models/User";


const djonatan = new User("Djonatan", "djonatanw", "dj@gmail.com", "Dj123456789")
const simone = new User("Simone", "syh", "syh@gmail.com", "Syh123456789")
const andre = new User("André", "andre", "andre@gmail.com", "Andre123456789")

djonatan.createUsers(djonatan)
simone.createUsers(simone)
andre.createUsers(andre)

const tweet1 = new Tweet("first tweet djonatan", "Normal", djonatan);
const tweet2 = new Tweet("second tweet djonatan", "Normal", djonatan);
const tweet3 = new Tweet("first tweet simone", "Normal", simone);
const tweet4 = new Tweet("firts tweet andre", "Normal", andre);

djonatan.sendTweet(tweet1)
djonatan.sendTweet(tweet2)
simone.sendTweet(tweet3)
andre.sendTweet(tweet4)

simone.follow(djonatan)
simone.follow(andre)

tweet1.like(djonatan)
tweet1.like(andre)
tweet2.like(andre)
tweet1.like(simone)
tweet4.like(simone)

tweet1.reply("First reply to Djonatan's tweet", djonatan)
tweet1.reply("second reply to andre's tweet", andre)


simone.showFeed()
djonatan.showFeed()
andre.showFeed()