export interface User {
    userID: string;
    firstName: string;
    lastName: string;
    gender: string;
    userName: string;
    password: string;
    email: string;
    userPhoto: string;
    userRole: string;
}

export interface UserImage {
    userID: number;
    file: FormData;
}

export interface UserData {
    userID: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    userPhoto: string;
    userRole: string;
}

export interface JwtToken {
    token: string;
    message: string;
}