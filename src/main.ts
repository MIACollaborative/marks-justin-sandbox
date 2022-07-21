import * as dotenv from 'dotenv';
import * as userService from './db/users.service';
import * as configService from './db/studyconfig.service';
import { NoActionDecisionRecord } from './models/noaction.decisionrecord';
import { User } from './models/user.model';
import { DecisionRecord } from './models/decisionrecord.model';
import { addDecisionRecord } from './db/decisionrecords.service';

dotenv.config();

// called by cron or by a test runner
export async function doTick(curTime: Date) { 
    let users = await userService.getAllUsers();
    let triggers = await configService.getTriggers();
    let decisionRecord: DecisionRecord;
    for (let u of users) {
        u = u as User;
        for (let t of triggers) {
            console.log('running trigger', t, 'for user', u.getName());
            if (!t.shouldRun(u, curTime)) continue; // next trigger
            let diceRoll = Math.random();
            if (diceRoll < t.getProbability(u, curTime)) {
                decisionRecord = t.doAction(u, curTime);
            } else {
                decisionRecord = new NoActionDecisionRecord(u, t.getName(), curTime);
            }
            addDecisionRecord(decisionRecord);
            console.log('ran trigger', t, 'for user', u.getName(), ':', decisionRecord);
        }
    }
}

