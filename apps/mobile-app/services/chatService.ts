import { supabase } from '@/lib/supabase';
import { IMessage } from 'react-native-gifted-chat';
import {API, handleApiError} from '@/api';
import {Alert} from "react-native";
import {Chatroom, findChatroomByUsersRequest, Message} from "@/api/chatroomApiClient";


export class ChatService {
  // Create or get existing chat room between two users
  static async findChatRoomByUsers(data: findChatroomByUsersRequest): Promise<Chatroom | null> {
    try {
      return await API.chat.findChatroomByUsers(data);
    } catch (error) {
      handleApiError(error, 'Failed to get chat room');
    }

    return null;
  }

  // // Get messages for a specific chat room
  // static async getChatMessages(chatRoomId: string): Promise<ChatMessage[]> {
  //   try {
  //     const { data: messages, error } = await supabase
  //       .from('messages')
  //       .select('*')
  //       .eq('chatRoomId', chatRoomId)
  //       .eq('isValid', true) // Only show valid messages
  //       .order('createdAt', { ascending: true });
  //
  //     if (error) {
  //       throw error;
  //     }
  //
  //     return messages || [];
  //   } catch (error) {
  //     console.error('Error fetching chat messages:', error);
  //     throw error;
  //   }
  // }
  //
  // // Send a new message
  // static async sendMessage(
  //   text: string,
  //   senderId: string,
  //   receiverId: string,
  //   chatRoomId: string
  // ): Promise<ChatMessage> {
  //   try {
  //     const { data: message, error } = await supabase
  //       .from('messages')
  //       .insert({
  //         text,
  //         senderId,
  //         receiverId,
  //         chatRoomId,
  //         isValid: true, // Will be updated by backend AI validation
  //       })
  //       .select()
  //       .single();
  //
  //     if (error) {
  //       throw error;
  //     }
  //
  //     return message;
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     throw error;
  //   }
  // }
  //
  // // Subscribe to real-time messages for a chat room
  // static subscribeToMessages(
  //   chatRoomId: string,
  //   onMessageReceived: (message: ChatMessage) => void
  // ) {
  //   const subscription = supabase
  //     .channel(`chat_room_${chatRoomId}`)
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'INSERT',
  //         schema: 'public',
  //         table: 'messages',
  //         filter: `chatRoomId=eq.${chatRoomId}`,
  //       },
  //       (payload) => {
  //         const newMessage = payload.new as ChatMessage;
  //         // Only notify about valid messages
  //         if (newMessage.isValid) {
  //           onMessageReceived(newMessage);
  //         }
  //       }
  //     )
  //     .subscribe();
  //
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }
  //
  // Convert ChatMessage to GiftedChat IMessage format
  static convertToGiftedChatMessage(message: Message): IMessage {
    return {
      _id: message.id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.senderId,
        name: message.senderId, // TODO: Get actual user name
      },
    };
  }
  //
  // // Convert GiftedChat IMessage to ChatMessage format
  // static convertFromGiftedChatMessage(
  //   message: IMessage,
  //   receiverId: string,
  //   chatRoomId: string
  // ): Omit<ChatMessage, 'id' | 'createdAt' | 'updatedAt' | 'isValid'> {
  //   return {
  //     text: message.text,
  //     senderId: message.user._id.toString(),
  //     receiverId,
  //     chatRoomId,
  //   };
  // }
}