import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import {PrismaModule} from "../prisma/prisma.module";
import { ChatroomController } from './chatroom.controller';
import {SupabaseModule} from "../supabase/supabase.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [PrismaModule, SupabaseModule, AuthModule],
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
