import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export interface User {
  id: string;
  email: string;
  created_at: string;
  // Add more user fields as needed
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all users from auth.users table (excluding current user)
      const { data, error } = await supabase
        .from('auth.users')
        .select('id, email, created_at')
        .neq('id', currentUser?.id || '');

      if (error) {
        // If we can't access auth.users directly, we might need to create a profiles table
        // For now, let's try to get users from the public schema if available
        console.log('Direct auth.users access failed, trying alternative approach');
        
        // Alternative: Try to get users from a profiles table or similar
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, created_at')
          .neq('id', currentUser?.id || '');

        if (profileError) {
          throw profileError;
        }

        setUsers(profileData || []);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      // For demo purposes, set some mock users
      setUsers([
        {
          id: '1',
          email: 'john.doe@example.com',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          email: 'mike.johnson@example.com',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
}