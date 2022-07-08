import { ObjectId } from 'mongodb';

export default class User {
    constructor(public name: string,
        public email: string, 
        public id: string) {
            this.name = name;
            this.email = email;
            this.id = id;
    }
}
