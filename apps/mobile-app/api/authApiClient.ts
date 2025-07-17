// Types
import {BaseApiClient} from "@/api/baseApiClient";

export interface SignUpRequest {
    email: string;
    password: string;
    fullName?: string;
    role?: 'STUDENT' | 'TUTOR' | 'ADMIN';
}

export interface SignUpResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        emailVerified: boolean;
        profile?: {
            id: string;
            fullName: string | null;
            role: string;
            createdAt: string;
        };
    };
}

export class AuthApiClient extends  BaseApiClient {
    // Authentication endpoints
    async signUp(data: SignUpRequest): Promise<SignUpResponse> {
        return this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

}