export interface User {
    appUserId: string;
    username: string;
    displayName: string;
    token: string;
    image?: string;
    name?: string;
    surname?: string;
    pesel?: string;
    sex?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    specialization?: string;
    isDoctor: string;
}

export interface UserFormValues {
    appUserId?: string;
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    name?: string;
    surname?: string;
    pesel?: string;
    sex?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    isDoctor?: string;
}