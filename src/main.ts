import * as dotenv from 'dotenv';
import * as userService from './db/users.service';
import * as configService from './db/studyconfig.service';
import { loadTestUsers }  from './tests/loadusers.tests';
import { loadTestTriggers } from './tests/loadtriggers.tests';
dotenv.config();

async function evaluateTriggers () {
    await loadTestUsers();
    let users = await userService.getAllUsers();
    console.log('users in db', users);  

    await loadTestTriggers();
    let triggers = await configService.getTriggers();
    console.log('triggers in db', triggers);
}

evaluateTriggers();
