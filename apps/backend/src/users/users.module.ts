import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import {AuthModule} from "../auth/auth.module";
import {SupabaseModule} from "../supabase/supabase.module";

@Module({
  imports: [PrismaModule, AuthModule, SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}