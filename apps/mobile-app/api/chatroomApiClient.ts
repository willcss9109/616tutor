// Types
import {BaseApiClient} from "@/api/baseApiClient";
import {SignUpRequest, SignUpResponse} from "@/api/authApiClient";

export interface findChatroomByUsersRequest {
    userIds: string[];
}

export interface Message {
    id: string,
    text: string,
    isValid: boolean,
    system: boolean,
    senderId: string,
    createdAt: string
}

export interface Participant {
    id: string;
    email: string,
    avatarUrl: string | null
}

export interface Chatroom {
    id: string;
    createdAt: string;
    updatedAt: string;
    messages: Message[]
    participants: Participant[]
}

export type findChatroomByUsersResponse = Chatroom

export class ChatroomApiClient extends  BaseApiClient {
    // Authentication endpoints
    async findChatroomByUsers(data: findChatroomByUsersRequest): Promise<findChatroomByUsersResponse> {
        return this.request('/chatroom/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

}