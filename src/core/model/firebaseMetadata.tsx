import {InterfaceCreatedAt} from "./firebaseTimestamp";

export class FirebaseMetadata {

    constructor(private _id: string | null, private _createdAt: InterfaceCreatedAt) {
        this.id = _id;
        this.createdAt = _createdAt;
    }

    get id(): string | null {
        return this._id;
    }

    set id(value: string | null) {
        this._id = value;
    }

    get createdAt(): InterfaceCreatedAt {
        return this._createdAt;
    }

    set createdAt(value: InterfaceCreatedAt) {
        this._createdAt = value;
    }
}
