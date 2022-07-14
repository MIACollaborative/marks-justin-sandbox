import { ObjectId } from 'mongodb';
import { isNull } from 'util';

export class User {

    private email: string;
    private name: string;
    private id: string;
    private prefs: Object | undefined;
    private state: Object | undefined;

    constructor(name: string,
        email: string, 
        id: string, 
        prefs?: Object,
        state?: Object) {
            this.name = name;
            this.email = email;
            this.id = id;
            this.prefs = prefs;
            this.state = state;
    }

    public static fromMongoDoc(mongoDoc: Object | null) {
        
        if (mongoDoc === null) return null;

        let id = mongoDoc['_id'].toString();
        return new User(mongoDoc['email'], 
            mongoDoc['name'], 
            id, 
            mongoDoc['prefs'], 
            mongoDoc['state']);

    }

    public getName() {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPrefs(): Object | undefined { 
        return this.prefs;
    }

    public getState(): Object | undefined {
        return this.state;
    }
}
