import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DbUser } from '@/api/userApiClient';
import { useAuth } from '@/hooks/useAuth';
import { ChatService } from '@/services/chatService';
import {Chatroom} from "@/api/chatroomApiClient";

interface ChatRoomScreenProps {}

interface ExtendedMessage extends IMessage {
  isValid?: boolean;
  senderId?: string;
}

export default function ChatRoomScreen({}: ChatRoomScreenProps) {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatRoom, setChatRoom] = useState<Chatroom | null>(null);
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get the selected user from params
  const selectedUser = params.user ? JSON.parse(params.user as string) as DbUser : null;

  // Create the current user object for GiftedChat
  const giftedChatUser: User = {
    _id: currentUser?.id || '1',
    name: currentUser?.email || 'You',
    avatar: undefined,
  };

  // Create the chat partner user object for GiftedChat
  const chatPartnerUser: User = {
    _id: selectedUser?.id || '2',
    name: selectedUser?.id || 'Chat Partner',
    avatar: undefined,
  };

  // Initialize chat room and load messages
  useEffect(() => {
    if (selectedUser && currentUser) {
      initializeChatRoom();
    }
  }, [selectedUser, currentUser]);

  const initializeChatRoom = async () => {
    if (!selectedUser || !currentUser) return;

    try {
      setLoading(true);
      
      // Get or create chat room
      const room = await ChatService.findChatRoomByUsers({
        userIds: [selectedUser.id, currentUser.id]
      });
      setChatRoom(room);

      // Load existing messages
      const existingMessages = room?.messages ?? [];
      const giftedMessages = existingMessages.map(msg =>
        ChatService.convertToGiftedChatMessage(msg)
      );
      setMessages(giftedMessages.reverse()); // GiftedChat expects messages in reverse order

      // // Subscribe to real-time messages
      // const unsubscribe = ChatService.subscribeToMessages(room.id, (newMessage) => {
      //   const giftedMessage = ChatService.convertToGiftedChatMessage(newMessage);
      //   setMessages(previousMessages =>
      //     GiftedChat.append(previousMessages, [giftedMessage])
      //   );
      // });
      //
      // return unsubscribe;
    } catch (error) {
      console.error('Error initializing chat room:', error);
      Alert.alert('Error', 'Failed to load chat room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle sending messages
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    // if (!selectedUser || !currentUser || !chatRoom) {
    //   Alert.alert('Error', 'Unable to send message. Please try again.');
    //   return;
    // }
    //
    // const messageToSend = newMessages[0];
    // if (!messageToSend) return;
    //
    // try {
    //   setLoading(true);
    //
    //   // Send message to backend
    //   await ChatService.sendMessage(
    //     messageToSend.text,
    //     currentUser.id,
    //     selectedUser.id,
    //     chatRoom.id
    //   );
    //
    //   // Add message to local state immediately for better UX
    //   // The real-time subscription will handle updates if the message is validated
    //   const messagesToAdd: ExtendedMessage[] = newMessages.map(msg => ({
    //     ...msg,
    //     senderId: currentUser.id,
    //     isValid: true, // Will be updated by backend AI validation
    //   }));
    //
    //   setMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, messagesToAdd)
    //   );
    //
    // } catch (error) {
    //   console.error('Error sending message:', error);
    //   Alert.alert('Error', 'Failed to send message. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  }, [selectedUser, currentUser, chatRoom]);

  if (!selectedUser) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No user selected for chat</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={giftedChatUser}
        placeholder="Type a message..."
        showAvatarForEveryMessage={false}
        showUserAvatar={true}
        renderUsernameOnMessage={true}
        isLoadingEarlier={loading}
        // Styling
        // textInputStyle={styles.textInput}
        // containerStyle={styles.chatContainer}
        // messageContainerStyle={styles.messageContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    marginHorizontal: 8,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#DC2626',
    textAlign: 'center',
  },
  invalidMessageContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  invalidMessageBubble: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  invalidMessageText: {
    color: '#DC2626',
    fontSize: 14,
    fontStyle: 'italic',
  },
});