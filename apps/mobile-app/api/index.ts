// src/api/index.ts
import {AuthApiClient} from "@/api/authApiClient";
import {UserApiClient} from "@/api/userApiClient";
import {ChatroomApiClient} from "@/api/chatroomApiClient";

export const API = {
    auth: new AuthApiClient(),
    user: new UserApiClient(),
    chat: new ChatroomApiClient()
};

export {handleApiError} from "@/api/baseApiClient";