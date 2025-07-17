import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class SignUpResponseDto {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    emailVerified: boolean;
    profile?: {
      id: string;
      fullName: string | null;
      role: UserRole;
      createdAt: Date;
    };
  };
}