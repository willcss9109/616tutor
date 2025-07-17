import {JwtPayload} from "jsonwebtoken";

export type SupabaseJwtPayload = JwtPayload & {
    sub: string,
    email: string,
    phone: string,
    role: string,
    app_metadata: {
        provider: string,
        providers: string[]
    },
    user_metadata: {
        email_verified: boolean,
    },
    session_id: string,
    is_anonymous: boolean,
}