import { Alert } from 'react-native';
import {supabase} from "@/lib/supabase";

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// API Client Class
export class BaseApiClient {
    private baseURL: string;
    private accessToken: string | null = null;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    protected async request(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<any> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const { data: { session } } = await supabase.auth.getSession();

        if (session?.access_token) {
            (headers as any).Authorization = `Bearer ${session.access_token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }
}

// Helper function to handle API errors
export const handleApiError = (error: any, defaultMessage: string = 'An error occurred') => {
    const message = error?.message || defaultMessage;
    Alert.alert('Error', message);
    console.error('API Error:', error);
};