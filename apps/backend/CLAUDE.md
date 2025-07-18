# Backend API Development Guidelines

## Code Structure & Modularity

Never create a file over 500 lines. Break down into reusable modules, services, and controllers.

Structure code by feature/domain, for example:

```
/src/auth/
   auth.controller.ts
   auth.service.ts
   auth.module.ts
   dto/
      login.dto.ts
      register.dto.ts
   guards/
       jwt-auth.guard.ts

/src/messages/
   messages.controller.ts
   messages.service.ts
   messages.module.ts
   dto/
      create-message.dto.ts
   entities/
       message.entity.ts
```

### Key Dependencies

- Use **Prisma** as the ORM for database interactions
- Use **Supabase PostgreSQL** as the primary database
- Use **OpenAI GPT-4-turbo** for AI moderation and assistant features
- Use **@nestjs/jwt** for authentication
- Use **class-validator** and **class-transformer** for DTOs
- Environment variables go in `.env`, loaded using `@nestjs/config`

## State & API Access

Use NestJS dependency injection and service-oriented architecture.

### Message Processing Flow

1. Client sends message to POST `/messages` endpoint
2. Controller validates request using DTOs
3. Service processes message through AI moderation
4. Store message in database with `is_valid` flag
5. Broadcast valid messages via WebSocket/Server-Sent Events
6. Return appropriate response to client

### AI Moderation Pipeline

1. Extract message content and metadata
2. Send to OpenAI API for content analysis
3. Check for contact information, inappropriate content
4. Set `is_valid` flag based on AI response
5. Log moderation decisions for admin review

## Testing & Reliability

Use **Jest** for unit testing and **Supertest** for e2e testing

**Directories:**
- Unit tests: `src/**/*.spec.ts`
- E2E tests: `test/**/*.e2e-spec.ts`

### Include:

- **Controller tests** - HTTP request/response validation
- **Service tests** - Business logic and AI integration
- **Guard tests** - Authentication and authorization
- **DTO tests** - Data validation and transformation
- **Database tests** - Repository patterns and queries
- **E2E tests** - Full API workflow testing

## Style & Conventions

- **Language:** TypeScript only
- **Framework:** NestJS with decorators
- **Validation:** class-validator for DTOs
- **Format:** ESLint + Prettier config
- **Database:** Prisma schema-first approach
- **API:** RESTful endpoints with proper HTTP status codes
- **Error Handling:** Global exception filters
- **Logging:** Structured logging with context

### NestJS Patterns

- Use **@Controller()** decorators for route handling
- Use **@Injectable()** services for business logic
- Use **@Module()** for feature organization
- Use **DTOs** for request/response validation
- Use **Guards** for authentication/authorization
- Use **Interceptors** for cross-cutting concerns
- Use **Pipes** for data transformation

## Documentation & Comments

- Update README.md when new endpoints, services, or dependencies are added
- Use **Swagger/OpenAPI** decorators for API documentation
- Document complex business logic in services
- Explain AI moderation decisions and thresholds
- Document environment variables and configuration

### API Documentation

- Use `@ApiOperation()` for endpoint descriptions
- Use `@ApiResponse()` for response schemas
- Use `@ApiBody()` for request body documentation
- Use `@ApiParam()` for path parameters
- Use `@ApiQuery()` for query parameters

## Security & Best Practices

- **Authentication:** JWT tokens with refresh mechanism
- **Authorization:** Role-based access control (RBAC)
- **Rate Limiting:** Apply to all public endpoints
- **Input Validation:** Strict DTO validation
- **SQL Injection:** Use Prisma parameterized queries
- **CORS:** Configure appropriate origins
- **Helmet:** Security headers middleware
- **Environment:** Never commit secrets to repository

## Database & ORM

- Use **Prisma** for all database operations
- Define clear **schema.prisma** models
- Use **migrations** for schema changes
- Implement **soft deletes** for important data
- Use **database transactions** for multi-step operations
- Index frequently queried fields
- Use **connection pooling** for performance

## Error Handling

- Use NestJS **exception filters** for consistent error responses
- Implement **custom exceptions** for business logic errors
- Log errors with appropriate context
- Return meaningful error messages to clients
- Use proper HTTP status codes
- Handle **database connection errors** gracefully

## Performance & Scalability

- Use **caching** for frequently accessed data
- Implement **database indexes** for query optimization
- Use **connection pooling** for database connections
- Monitor **API response times** and **error rates**
- Implement **rate limiting** to prevent abuse
- Use **compression** for response payloads