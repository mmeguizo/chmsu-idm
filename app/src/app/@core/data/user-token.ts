import { Observable } from 'rxjs';

export interface UserToken {
    _id: string;
    deleted: boolean;
    email: string;
    id: string;
    profile_pic: string;
    role: string;
    status: string;
    username: string;
}
