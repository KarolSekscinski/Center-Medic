import { User } from "./user";

export interface Profile {
    id: string;
    username: string;
    email: string;
    displayName: string;
    image?: string;
    phoneNumber?: string;
    isDoctor?: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.id = user.appUserId;
        this.username = user.username;
        this.isDoctor = user.isDoctor;
        this.displayName = user.displayName;
        this.image = user.image;
        
    }
}