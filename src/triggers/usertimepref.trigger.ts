
import { DecisionRecord } from '../models/decisionrecord.model';
import { User } from '../models/user.model';
import { ITrigger } from './trigger.interface';

export default class UserTimePrefTrigger implements ITrigger {

    getName(): string {
        return "UserTimePrefTrigger";
    }

    shouldRun(user: User, curTime: Date): boolean {
        let prefs = user.getPrefs();
        if (!prefs) return false;
        let messageTimes = prefs['messageTimes'];
        if (!messageTimes) return false;

        console.log(messageTimes);
        for (let mt in messageTimes) {
            let t = messageTimes[mt] as Date;
            t.setFullYear(curTime.getFullYear());
            t.setMonth(curTime.getMonth());
            t.setDate(curTime.getDate());
            console.log(t);
            let diff = t.getTime() - curTime.getTime();
            if (Math.abs(diff) < 1000 * 60) { // within a minute
                return true;
            }
        }
        return false; // didn't match
    }

    getProbability(user: User, curTime: Date): number {
        return 1.0;
    }

    doAction(user: User, curTime: Date): DecisionRecord {
        console.log('did the action!');
        return new DecisionRecord(user, this, { message: "Did the action" }, new Date(),);
        // TODO: record user info, dice roll, probability, etc.
    }

}