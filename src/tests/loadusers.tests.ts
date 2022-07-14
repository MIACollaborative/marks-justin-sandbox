import { User } from "../models/user.model";
import { clearUsers, addUser, getUserById } from '../db/users.service';

const userPrefs = {
    zipcode: '48104',
    messageTimes: {
        morning: new Date(1970, 1, 1, 8, 0),
        midday: new Date(1970, 1, 1, 12, 0),
        afternoon: new Date(1970, 1, 1, 15, 0), 
        evening: new Date(1970, 1, 1, 18, 0)
    }
}

const userState = {
    weatherForecast: {
        value: 'OUTDOOR',
        updated: new Date()
    },
    location: {
        value: {
            latitude: 42.279594,
            longitude: -83.732124
        },
        updated: new Date()
    },
    semanticLocation: {
        value: 'Home', 
        updated: new Date()
    }
}

const testUsers = [
    new User('Mark Newman', 'mwnewman@umich.edu', '123', userPrefs, userState),
    new User('Pedja Klasnja', 'klasnja@umich.edu', '234'),
    new User('Patrick Neggie', 'patmn@umich.edu', '345'),
]

export async function loadTestUsers() {
    console.log('in loadTestUsers, clearing')
    await clearUsers();

    for (let tu of testUsers) {
        await addUser(tu);
    }
    return testUsers;
}

export async function findUser(userId: string) {
    let u = await getUserById(userId);
    return u;
}
