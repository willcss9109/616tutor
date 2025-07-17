import {Body, Controller, Get, Param, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {User} from "../auth/jwt/user.decorator";
import {SupabaseJwtPayload} from "../auth/jwt/types";
import {ChatroomService} from "./chatroom.service";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {SignUpDto} from "../auth/dto/signup.dto";
import FindOneOrCreateChatroomDto from "./dto/findOneOrCreateChatroom.dto";

@Controller('chatroom')
@UseGuards(JwtAuthGuard)
export class ChatroomController {
    constructor(private readonly chatroomService: ChatroomService) {}
    @Post("")
    find(
        @Body(ValidationPipe) findOneOrCreateChatroomDto: FindOneOrCreateChatroomDto,
        @User() user: SupabaseJwtPayload
    ) {
        return this.chatroomService.findOneOrCreate(user.sub, findOneOrCreateChatroomDto.userIds);
    }

}
