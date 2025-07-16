# Mobile App Development Guidelines

## Code Structure & Modularity

Never create a file over 500 lines. Break down into reusable components, hooks, or utils.

Structure code by feature/screen, for example:

```
/screens/ChatRoomScreen.tsx
/components/ChatBubble.tsx
/hooks/useSendMessage.ts
/utils/messageHelpers.ts
```

### Key Dependencies

- Use **supabase-js** for auth and database interaction
- Use **react-native-gifted-chat** as the primary chat UI layer
- Environment variables go in `.env`, loaded using `expo-constants` or `expo-crypto` if secure

## State & API Access

Use local React state and `useEffect`/`useCallback` for side effects.

### Async Messaging Flow

1. Messages go through Supabase insert after AI validation via backend
2. Use Supabase Realtime to subscribe to messages
3. Filter messages with `is_valid = true` before rendering to users
4. Show AI filtering warnings inline for invalid messages (visible to sender only)

## Testing & Reliability

Use **Jest** for unit testing components and helpers

**Directory:** `/__tests__/`

### Include:

- Snapshot tests for UI
- Utility function tests
- Edge case rendering (e.g. flagged message display)

## Style & Conventions

- **Language:** TypeScript only
- **Styling:** Tailwind CSS via NativeWind
- **Format:** with eslint + prettier config in project root
- Follow Expo module resolution and avoid native linking unless absolutely required
- Keep components functional (hooks-based)

## Documentation & Comments

- Update README.md when new screens, flows, or dependencies are added
- Leave inline comments where logic may not be obvious (e.g. realtime filtering or custom rendering)
- Explain why invalid messages are shown only to sender in JSX blocks as necessary

