| Folder         | Kaam                      |
| -------------- | ------------------------- |
| `controllers`  | Request/response handle   |
| `services`     | Main business logic       |
| `repositories` | Database operations       |
| `routes`       | API endpoints             |
| `middleware`   | Auth + errors             |
| `validators`   | Zod validation            |
| `events`       | Baad mein RabbitMQ events |
| `utils`        | JWT/password helpers      |
| `config`       | Environment configuration |
| `prisma`       | Database schema           |


POST /users
     ↓
Route
     ↓
Controller
     ↓
Validator
     ↓
Service
     ↓
Repository
     ↓
Prisma
     ↓
PostgreSQL

User Service
     ↓
user.events.ts
     ↓
RabbitMQ
     ↓
Notification Service