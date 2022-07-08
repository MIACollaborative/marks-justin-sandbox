import User from "../models/user.model";
import { clearUsers, addUser } from '../db/users.service';
import test from "node:test";

const testUsers = [
    new User('Mark Newman', 'mwnewman@umich.edu', '123'),
    new User('Pedja Klasnja', 'klasnja@umich.edu', '234'),
    new User('Patrick Neggie', 'patmn@umich.edu', '345'),
]

export async function loadTestUsers() {
    await clearUsers();

    for (let tu of testUsers) {
        await addUser(tu);
    }
    console.log('added all users', testUsers);
}