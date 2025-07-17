import React from 'react';
import { Stack } from 'expo-router';
import ChatRoomScreen from '@/screens/ChatRoomScreen';

export default function ChatRoute() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Chat',
          headerShown: true,
          headerBackVisible: true,
        }} 
      />
      <ChatRoomScreen />
    </>
  );
}