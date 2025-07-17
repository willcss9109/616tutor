import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { UsersModule } from '../users/users.module';
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";
import {JwtModule} from "./jwt/jwt.module";
import {PrismaModule} from "../prisma/prisma.module";
import {JwksService} from "./jwt/jwks.service";

@Module({
  imports: [SupabaseModule, PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}