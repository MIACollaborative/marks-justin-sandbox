import { DecisionRecord } from "../models/decisionrecord.model";
import { User } from "../models/user.model";
import { ITrigger } from "./trigger.interface";

export class NoActionDecisionRecord extends DecisionRecord {
    user: User;
    trigger: ITrigger;
    record: Object;
    timestamp: Date;

    constructor (user: User, trigger: ITrigger, timestamp: Date) {
        super(user, trigger, {action: "No Action"}, timestamp);
    }
}