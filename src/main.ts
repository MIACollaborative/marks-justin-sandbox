import * as dotenv from 'dotenv';
import * as userService from './db/users.service';
import * as configService from './db/studyconfig.service';
import { NoActionDecisionRecord } from './triggers/noaction.decisionrecord';
import { loadTestUsers }  from './tests/loadusers.tests';
import { loadTestTriggers } from './tests/loadtriggers.tests';
import { User } from './models/user.model';
import { DecisionRecord } from './models/decisionrecord.model';

dotenv.config();

async function evaluateTriggers () {
    await loadTestUsers();
    let users = await userService.getAllUsers();
    console.log('users in db', users);  

    await loadTestTriggers();
    let triggers = await configService.getTriggers();
    console.log('triggers in db', triggers);

    if (users === null || users[0] === null) return;
    let testId = users[0].getId();
    let testUser = await userService.getUserById(testId);
    console.log('found user', testId, testUser);
}

async function doTests() {
    console.log('running tests');
    await loadTestUsers();
    await loadTestTriggers();
    await doTick(new Date(1972, 2, 2, 8, 0));
    console.log('done running tests');
}

async function doTick(curTime: Date) { 
    let users = await userService.getAllUsers();
    let triggers = await configService.getTriggers();
    let decisionRecord: DecisionRecord;
    for (let u of users) {
        u = u as User;
        for (let t of triggers) {
            console.log('running trigger', t, 'for user', u);
            if (!t.shouldRun(u, curTime)) continue; // next trigger
            let diceRoll = Math.random();
            if (diceRoll < t.getProbability(u, curTime)) {
                decisionRecord = t.doAction(u, curTime);
            } else {
                decisionRecord = new NoActionDecisionRecord(u, t, curTime);
            }
            console.log('ran trigger', t, 'for user', u, ':', decisionRecord);
        }
    }
}

doTests();