import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private prisma: PrismaService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const { email, password } = signUpDto;
    
    try {
      // Create user in Supabase Auth and send confirmation email
      const supabase = this.supabaseService.getServiceClient();
      
      // First, create the user with admin API
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
      });

      if (authError) {
        throw new BadRequestException(authError.message);
      }

      if (!authData.user) {
        throw new BadRequestException('Failed to create user');
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if( error) {
        throw new BadRequestException('Failed to send confirmation email: ' + error.message);
      }

      // Create user profile in our database
      const userProfile = await this.prisma.user.create({
        data: {
          id: authData.user.id,
          email,
          role: 'STUDENT',
        },
      });

      return {
        success: true,
        message: 'User created successfully. Please check your email for verification.',
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          emailVerified: authData.user.email_confirmed_at !== null,
          profile: {
            id: userProfile.id,
            fullName: userProfile.fullName,
            role: userProfile.role,
            createdAt: userProfile.createdAt,
          },
        },
      };

    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException('Failed to create user account');
    }
  }

}