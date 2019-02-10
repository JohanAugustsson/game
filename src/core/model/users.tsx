import {InterfaceCreatedAt} from "./firebaseTimestamp";

export class User {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    createdAt: InterfaceCreatedAt;

    constructor(id: string, createdAt: InterfaceCreatedAt, firstName: string,
                lastName: string, email: string, uid: string) {
        this.firstName = firstName;
        this.uid = uid;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
    }
}
