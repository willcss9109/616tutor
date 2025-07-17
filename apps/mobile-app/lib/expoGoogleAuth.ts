import * as Linking from 'expo-linking';
import { supabase } from './supabase';
import { makeRedirectUri } from 'expo-auth-session'

export const signInWithGoogleExpo = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: Linking.createURL('/'),
      },
    });

    if (error) {
      console.error('OAuth error:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    return { data: null, error };
  }
};