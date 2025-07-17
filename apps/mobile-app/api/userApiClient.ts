import {BaseApiClient} from "@/api/baseApiClient";

export interface DbUser {
    id: string;
    fullName?: string;
    avatarUrl?: string;
    role: 'STUDENT' | 'TUTOR' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export class UserApiClient extends BaseApiClient {

    // User endpoints
    async getAllUsers(): Promise<DbUser[]> {
        return this.request('/users');
    }

    async getUserById(id: string): Promise<DbUser> {
        return this.request(`/users/${id}`);
    }
}