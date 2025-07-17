import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll(currentUserId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: {
          not: currentUserId, // Exclude the current user from the list
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        sentMessages: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            chatRoom: {
              include: {
                participants: {
                  select: { id: true, fullName: true },
                },
              },
            },
          },
        },
        chatRooms: {
          include: {
            participants: {
              select: { id: true, fullName: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}