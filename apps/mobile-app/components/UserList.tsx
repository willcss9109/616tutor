import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {DbUser} from "@/api/userApiClient";

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onUserPress: (user: DbUser) => void;
  onRefresh?: () => void;
}

interface UserItemProps {
  user: DbUser;
  onPress: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  const displayName = user.id;
  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.userItem} onPress={onPress}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.joinDate}>Joined {formattedDate}</Text>
        </View>
      </View>
      <View style={styles.chatIcon}>
        <Text style={styles.chatIconText}>💬</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function UserList({ users, loading, error, onUserPress, onRefresh }: UserListProps) {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading users</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        {onRefresh && (
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No users found</Text>
        <Text style={styles.emptySubtext}>
          Be the first to start a conversation!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserItem
          user={item}
          onPress={() => onUserPress(item)}
        />
      )}
      refreshing={loading}
      onRefresh={onRefresh}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  chatIcon: {
    padding: 8,
  },
  chatIconText: {
    fontSize: 24,
  },
  separator: {
    height: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});