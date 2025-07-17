import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {SupabaseService} from "../supabase/supabase.service";

@Injectable()
export class ChatroomService {

    constructor(
        private supabaseService: SupabaseService,
        private prisma: PrismaService
    ) {}

    async findOneOrCreate(
        currentUserId: string,
        userIds: string[]
    ) {

        if (!userIds.includes(currentUserId)) {
            throw new ForbiddenException('Current user must be part of the chatroom');
        }

        const user1Id = userIds[0];
        const user2Id = userIds[1];

        // Validate that both users exist in Supabase
        if(!await this.supabaseService.isUserExists(user1Id)) {
            throw new NotFoundException(`User with ID ${user1Id} does not exist`);
        }
        if(!await this.supabaseService.isUserExists(user2Id)) {
            throw new NotFoundException(`User with ID ${user2Id} does not exist`);
        }

        // First, try to find existing chat room
        const existingRoom = await this.prisma.chatRoom.findFirst({
            where: {
                participants: {
                    every: {
                        id: {
                            in: [user1Id, user2Id]
                        }
                    },
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 10,
                },
                participants: true
            }
        });

        if (existingRoom) {
            return existingRoom;
        }

        // If no existing room, create a new one
        return await this.prisma.chatRoom.create({
            data: {
                participants: {
                    connect: [
                        {id: user1Id},
                        {id: user2Id}
                    ]
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 10,
                },
                participants: true
            }
        });
    }

}
