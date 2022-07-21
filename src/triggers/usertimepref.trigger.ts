
import { DecisionRecord } from '../models/decisionrecord.model';
import { User } from '../models/user.model';
import { ITrigger } from '../models/trigger.interface';
import { writeLogMessage } from '../actions/logwriter.action';
import { MessageTimePrefs } from '../dataModels/prefs/messageTimePrefs.model';

export default class UserTimePrefTrigger implements ITrigger {

    name: string = "UserTimePrefTrigger";

    getName(): string {
        return this.name;
    }

    shouldRun(user: User, curTime: Date): boolean {
        let prefs: MessageTimePrefs | undefined = 
            user.getPrefs(MessageTimePrefs.KEY) as MessageTimePrefs;
        let messageTimePrefs: MessageTimePrefs = 
            prefs as MessageTimePrefs;
        if (!messageTimePrefs) return false;

        // TODO: deal with timezones?
        for (let mt of messageTimePrefs.namedTimes) {
            let t = mt.time;
            t.setFullYear(curTime.getFullYear());
            t.setMonth(curTime.getMonth());
            t.setDate(curTime.getDate());
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
        let message: string = "Did the action for " + user.getName();
        writeLogMessage(message).then(() => {
            // not sure what to do here.
            // the action should log it's own errors, not the trigger.
            // the trigger is "fire and forget" perhaps.
        }); 
        return new DecisionRecord(user, this.name, { message: message }, curTime);
    }

}