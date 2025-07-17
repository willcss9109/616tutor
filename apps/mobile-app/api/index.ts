// src/api/index.ts
import {AuthApiClient} from "@/api/authApiClient";
import {UserApiClient} from "@/api/userApiClient";

export const API = {
    auth: new AuthApiClient(),
    user: new UserApiClient(),
};

export {handleApiError} from "@/api/baseApiClient";