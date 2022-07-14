
import { User } from '../models/user.model';
import { DecisionRecord } from '../models/decisionrecord.model';

export interface ITrigger {
    getName(): string;
    shouldRun(user: User, curTime: Date): boolean; 
    getProbability(user: User, curTime: Date): number;
    doAction(user: User, curTime: Date): DecisionRecord;
}