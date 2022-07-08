import { Collection } from 'mongodb';
import { getDB } from './database.service';
import User from '../models/user.model';

let userCollection: Collection;

async function getUserCollection() {
    if (!userCollection) {
        const db = await getDB();
        userCollection = db.collection(process.env.USERS_COLLECTION_NAME!);
    }
    return userCollection;
}

// get all users
export async function getAllUsers() {
    let uColl = await getUserCollection();
    let users = await uColl.find({}).toArray();
    return users; // turn these into Justin users
}

export async function addUser(user: User) {
    let uColl = await getUserCollection();
    await uColl.insertOne(user);
}

export async function clearUsers() {
    let uColl = await getUserCollection();
    await uColl.deleteMany({});    
}