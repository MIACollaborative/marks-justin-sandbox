import { User } from "./user.model";
import { ITrigger } from '../triggers/trigger.interface';

export class DecisionRecord {
    timestamp: Date;
    user: User;
    trigger: ITrigger;
    record: Object;

    constructor(user: User, trigger: ITrigger, record: Object, timestamp: Date) {
        this.user = user;
        this.trigger = trigger;
        this.record = record;
        this.timestamp = timestamp
    }
}