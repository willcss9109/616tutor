import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe, UseGuards, Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {JwtPayload} from "jsonwebtoken";
import {User} from "../auth/jwt/user.decorator";
import {SupabaseJwtPayload} from "../auth/jwt/types";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@User() user: SupabaseJwtPayload) {
    return this.usersService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

}