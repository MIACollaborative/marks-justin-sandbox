import { Collection, ObjectId } from 'mongodb';
import { getDB } from './database.service';

let configCollection: Collection;

async function getConfigCollection() {
    if (!configCollection) {
        const db = await getDB();
        configCollection = db.collection(process.env.CONFIG_COLLECTION_NAME!);
    }
    return configCollection;
}

export async function getTriggers() {
    let cfgColl = await getConfigCollection();
    let triggerDoc = await cfgColl.find({_id: 'triggers'}).next();
    let triggerNames = triggerDoc!.triggers;
    return triggerNames;
}

export async function clearTriggers() {
    let cfgColl = await getConfigCollection();
    let triggerDoc = await cfgColl.find({_id: 'triggers'}).next();
    triggerDoc!.triggers = [];
    await cfgColl.replaceOne({_id: 'triggers'}, triggerDoc!);
}

export async function addTrigger(trigger: string) {
    let cfgColl = await getConfigCollection();
    let triggerDoc = await cfgColl.find({_id: 'triggers'}).next();
    triggerDoc!.triggers.push(trigger);
    await cfgColl.replaceOne({_id: 'triggers'}, triggerDoc!);
}