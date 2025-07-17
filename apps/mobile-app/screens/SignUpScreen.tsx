import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { API, handleApiError } from '@/api';
import { signInWithGoogleExpo } from '@/lib/expoGoogleAuth';
import { validateSignUpForm } from '@/utils/validation';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validate all fields
    const validation = validateSignUpForm(email, password);
    if (!validation.isValid) {
      Alert.alert('Error', validation.message || 'Please check your input');
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.auth.signUp({
        email,
        password,
      });
      
      if (response.success) {
        Alert.alert(
          'Success', 
          response.message,
          [
            {
              text: 'OK',
              onPress: () => router.push('/login'),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to create account');
      }
    } catch (error) {
      handleApiError(error, 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleSignUp = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data, error } = await signInWithGoogleExpo();
  //
  //     if (error) {
  //       Alert.alert('Error', error.message || 'Google sign-up failed');
  //     } else if (data?.session) {
  //       // Successfully authenticated, navigate to main app
  //       Alert.alert(
  //         'Success',
  //         'Account created successfully with Google!',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => router.push('/(tabs)'),
  //           },
  //         ]
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-Up error:', error);
  //     Alert.alert('Error', 'Google sign-up failed. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with 616 Tutor</Text>
          </View>

          {/* Sign Up Form */}
          <View style={styles.form}>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text style={styles.passwordHint}>Must be at least 6 characters</Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/*/!* Divider *!/*/}
            {/*<View style={styles.divider}>*/}
            {/*  <View style={styles.dividerLine} />*/}
            {/*  <Text style={styles.dividerText}>or</Text>*/}
            {/*  <View style={styles.dividerLine} />*/}
            {/*</View>*/}

            {/*/!* Google Sign-Up Button *!/*/}
            {/*<TouchableOpacity*/}
            {/*  style={[styles.googleButton, isLoading && styles.googleButtonDisabled]}*/}
            {/*  onPress={handleGoogleSignUp}*/}
            {/*  disabled={isLoading}*/}
            {/*>*/}
            {/*  <Text style={styles.googleButtonText}>*/}
            {/*    {isLoading ? 'Creating Account...' : '🔍 Continue with Google'}*/}
            {/*  </Text>*/}
            {/*</TouchableOpacity>*/}
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    color: '#111827',
    fontSize: 16,
  },
  passwordHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  signUpButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  loginText: {
    color: '#6B7280',
  },
  loginLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  googleButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  googleButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
});