import {UserRole} from "@/entities/User";

export interface Profile {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    role?: UserRole[];
}
