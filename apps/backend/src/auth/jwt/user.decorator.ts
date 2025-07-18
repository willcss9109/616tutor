import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {SupabaseJwtPayload} from "./types";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as SupabaseJwtPayload;
    },
);