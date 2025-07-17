import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }
}