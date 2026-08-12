

Root folder :

```text
backend-assignment/
├── api-gateway/
├── user-service/
├── notification-side/
├── README.md
├── API.md
├── architecture.png
└── .gitignore
```

# Microservices Backend System

A small microservices-based backend system built using Node.js, TypeScript, Express.js, PostgreSQL, Prisma, RabbitMQ, JWT authentication, password hashing, validation, and rate limiting.

The system consists of:

1. API Gateway
2. User Service
3. Notification Service

The User Service and Notification Service communicate asynchronously through RabbitMQ and do not communicate with each other using REST APIs or WebSockets.

---

# 1. Architecture

`
                           CLIENT
                              |
                              | HTTP
                              v
                    +--------------------+
                    |    API GATEWAY     |
                    |       :3000        |
                    +---------+----------+
                              |
                              | HTTP
                              v
                    +--------------------+
                    |    USER SERVICE    |
                    |       :3001        |
                    +---------+----------+
                              |
                         Prisma ORM
                              |
                              v
                    +--------------------+
                    |    PostgreSQL      |
                    |      backend       |
                    |       :5433        |
                    +--------------------+

                    USER SERVICE
                          |
                          | USER_CREATED
                          | Async Event
                          v
                    +--------------------+
                    |      RABBITMQ      |
                    |       :5672        |
                    +---------+----------+
                              |
                              | Async Message
                              v
              +-----------------------------+
              |   NOTIFICATION SERVICE      |
              |          :4002              |
              +-------------+---------------+
                            |
                       Prisma ORM
                            |
                            v
              +-----------------------------+
              |        PostgreSQL           |
              |      notification_db        |
              |           :5433             |
              +-----------------------------+




# 2. Project Overview

This project demonstrates a small distributed microservices architecture.

The API Gateway acts as the entry point for clients.

The User Service handles user registration, login, authentication, and user data.

The Notification Service handles notification events received asynchronously from RabbitMQ.

The User Service and Notification Service are loosely coupled because they communicate through a message broker instead of directly calling each other through REST APIs.

---

# 3. Components

## API Gateway

Port:

```text
3000
```

Responsibilities:

* Single entry point for clients
* Request routing
* JWT authentication
* Rate limiting
* Error handling
* Communication with User Service
* RabbitMQ integration where required

The API Gateway does not directly access PostgreSQL.

---

## User Service

Port:

```text
3001
```

Responsibilities:

* User registration
* User login
* Password hashing
* Password verification
* JWT generation
* User retrieval
* PostgreSQL database operations
* Prisma ORM
* Publishing user events to RabbitMQ

Database:

```text
backend
```

---

## Notification Service

Port:

```text
4002
```

Responsibilities:

* Consume events from RabbitMQ
* Process notification events
* Handle asynchronous notifications
* Store notification information
* PostgreSQL database operations
* Prisma ORM

Database:

```text
notification_db
```

---

# 4. Communication Architecture

There are two communication patterns in this system.

## Client → API Gateway

HTTP is used between the client and API Gateway.

```text
Client
   |
   | HTTP
   v
API Gateway
```

## API Gateway → User Service

HTTP is used between the API Gateway and User Service.

```text
API Gateway
     |
     | HTTP
     v
User Service
```

## User Service → Notification Service

The User Service and Notification Service do NOT communicate using REST APIs or WebSockets.

RabbitMQ is used for asynchronous communication.

```text
User Service
     |
     | USER_CREATED
     v
RabbitMQ
     |
     | Async Message
     v
Notification Service
```

This provides loose coupling between the services.

---

# 5. Event Flow

When a user registers:

```text
Client
  |
  v
API Gateway
  |
  v
User Service
  |
  +----------------------+
  |                      |
  v                      v
PostgreSQL             RabbitMQ
                           |
                           v
                  Notification Service
                           |
                           v
                      PostgreSQL
```

The User Service publishes a `USER_CREATED` event.

Example:

```json
{
  "event": "USER_CREATED",
  "data": {
    "userId": "user-id",
    "email": "user@example.com",
    "name": "User"
  }
}
```

The Notification Service consumes the event asynchronously.

---

# 6. Technology Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Prisma ORM
* RabbitMQ
* Axios
* JWT
* bcryptjs
* Express Rate Limit
* Docker
* Git

---

# 7. Project Structure

```text
backend-assignment/
│
├── api-gateway/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── mq.ts
│   │   │
│   │   ├── consumers/
│   │   │   └── user.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── gateway.ts
│   │   │   └── user.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── error.ts
│   │   │   └── rateLimit.ts
│   │   │
│   │   ├── routes/
│   │   │   └── route.ts
│   │   │
│   │   ├── services/
│   │   │   └── user.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── user-service/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── prisma.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── controller.ts
│   │   │
│   │   ├── events/
│   │   │   └── user.events.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── error.ts
│   │   │
│   │   ├── repositories/
│   │   │   └── repo.ts
│   │   │
│   │   ├── routes/
│   │   │   └── user.routes.ts
│   │   │
│   │   ├── services/
│   │   │   └── user.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   │
│   │   ├── validators/
│   │   │   └── user.validator.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   ├── prisma.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── notification-side/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── consumers/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   │
│   ├── .env
│   ├── prisma.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
├── API.md
├── architecture.png
└── .gitignore
```

---

# 8. Environment Variables

Each service has its own environment configuration.

Real credentials must never be committed to GitHub.

## API Gateway `.env`

```env
PORT=3000
USER_SERVICE_URL=http://localhost:3001
RABBITMQ_URL=amqp://localhost:5672
JWT_SECRET=your_jwt_secret
```

## User Service `.env`

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5433/backend?schema=public
JWT_SECRET=your_jwt_secret
RABBITMQ_URL=amqp://localhost:5672
```

## Notification Service `.env`

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5433/notification_db?schema=public
PORT=4002
RABBITMQ_URL=amqp://localhost:5672
```

The Notification Service does not require `USER_SERVICE_URL` because it communicates with the User Service through RabbitMQ rather than REST.

---

# 9. Environment Security

The actual `.env` files contain local credentials and must not be pushed to a public repository.

Use `.env.example` files instead.

Example:

```env
PORT=
DATABASE_URL=
JWT_SECRET=
RABBITMQ_URL=
USER_SERVICE_URL=
```

Never commit:

```text
.env
```

---

# 10. Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Docker Desktop
* Git

---

# 11. PostgreSQL Setup

Create two PostgreSQL databases.

## User Service Database

```text
backend
```

## Notification Service Database

```text
notification_db
```

PostgreSQL is running on:

```text
localhost:5433
```

Example User Service connection:

```text
postgresql://postgres:YOUR_PASSWORD@localhost:5433/backend?schema=public
```

Example Notification Service connection:

```text
postgresql://postgres:YOUR_PASSWORD@localhost:5433/notification_db?schema=public
```

---

# 12. RabbitMQ Setup

RabbitMQ is used as the message broker.

Start Docker Desktop.

If the RabbitMQ container already exists:

```bash
docker start rabbitmq
```

Check:

```bash
docker ps
```

RabbitMQ ports:

```text
5672   AMQP
15672  Management UI
```

If the container does not exist:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management
```

RabbitMQ Management UI:

```text
http://localhost:15672
```

---

# 13. Install Dependencies

## API Gateway

```bash
cd api-gateway
npm install
```

## User Service

```bash
cd ../user-service
npm install
```

## Notification Service

```bash
cd ../notification-side
npm install
```

---

# 14. Prisma Setup

Prisma is used in the User Service and Notification Service.

## User Service

```bash
cd user-service
npx prisma generate
npx prisma migrate dev --name init
```

## Notification Service

```bash
cd notification-side
npx prisma generate
npx prisma migrate dev --name init
```

---

# 15. Run User Service

Open a terminal:

```bash
cd user-service
npx tsx src/server.ts
```

Expected:

```text
PostgreSQL connected
User event bus connected
User Service running on port 3001
```

---

# 16. Run Notification Service

Open another terminal:

```bash
cd notification-side
npx tsx src/server.ts
```

Expected:

```text
PostgreSQL connected
RabbitMQ connected
Notification Service running on port 4002
```

---

# 17. Run API Gateway

Open another terminal:

```bash
cd api-gateway
npx tsx src/server.ts
```

Expected:

```text
RabbitMQ connected
Listening to queue: gateway.user
API Gateway running on port 3000
```

---

# 18. API Documentation

Base URL:

```text
http://localhost:3000
```

---

## Register User

### Request

```http
POST /users/register
```

Full URL:

```text
http://localhost:3000/users/register
```

### Body

```json
{
  "name": "Gateway User",
  "email": "gateway@test.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "name": "Gateway User",
    "email": "gateway@test.com"
  }
}
```

---

# 19. Login

### Request

```http
POST /users/login
```

Full URL:

```text
http://localhost:3000/users/login
```

### Body

```json
{
  "email": "gateway@test.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "user-id",
      "name": "Gateway User",
      "email": "gateway@test.com"
    }
  }
}
```

---

# 20. Get User

This is a protected endpoint.

### Request

```http
GET /users/:id
```

Example:

```text
http://localhost:3000/users/USER_ID
```

### Header

```http
Authorization: Bearer JWT_TOKEN
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Gateway User",
    "email": "gateway@test.com"
  }
}
```

---

# 21. Health Check

### Request

```http
GET /health
```

URL:

```text
http://localhost:3000/health
```

Expected:

```json
{
  "success": true,
  "message": "API Gateway is running",
  "service": "api-gateway"
}
```

---

# 22. Authentication

JWT is used to protect authenticated routes.

During login, the User Service generates a JWT token.

The token is sent using:

```http
Authorization: Bearer <JWT_TOKEN>
```

The API Gateway verifies the token before forwarding protected requests.

---

# 23. Password Security

Passwords are never stored as plain text.

The User Service uses bcrypt hashing.

Registration:

```text
Plain Password
      |
      v
   bcrypt
      |
      v
Hashed Password
      |
      v
 PostgreSQL
```

During login, the password is compared against the stored hash.

---

# 24. Request Validation

The User Service validates incoming requests.

Registration validates:

* Name
* Email
* Password
* Password length

Login validates:

* Email
* Password

Invalid requests return:

```text
400 Bad Request
```

---

# 25. Rate Limiting

The API Gateway uses `express-rate-limit`.

Rate limiting helps protect the API from excessive requests and basic abuse.

---

# 26. RabbitMQ Event Architecture

When a user registers:

```text
POST /users/register
        |
        v
API Gateway
        |
        v
User Service
        |
        +-------------> PostgreSQL
        |
        |
        +-------------> RabbitMQ
                              |
                              | USER_CREATED
                              v
                    Notification Service
                              |
                              v
                         PostgreSQL
```

The Notification Service consumes the event asynchronously.

The User Service does not call the Notification Service through REST.

---

# 27. Example RabbitMQ Event

```json
{
  "event": "USER_CREATED",
  "data": {
    "userId": "user-id",
    "email": "gateway@test.com",
    "name": "Gateway User"
  }
}
```

---

# 28. Reliability

RabbitMQ provides asynchronous communication between services.

The architecture reduces direct coupling between User Service and Notification Service.

Messages are configured as persistent where required.

RabbitMQ exchanges and queues are configured for durable messaging where required.

Consumers process messages asynchronously.

---

# 29. Secure Communication

The system separates external HTTP communication from internal event-driven communication.

External communication:

```text
Client
  |
  | HTTP
  v
API Gateway
```

Backend event communication:

```text
User Service
     |
     | RabbitMQ
     v
Notification Service
```

Sensitive configuration such as database credentials and JWT secrets is stored in environment variables.

For production deployment, RabbitMQ should use TLS (`amqps`) and authenticated broker credentials rather than the local development connection:

```text
amqp://localhost:5672
```

---

# 30. Error Handling

Centralized error middleware is used to return consistent error responses.

Example:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

---

# 31. Scalability

The architecture is designed so that services can be scaled independently.

For example:

```text
             Load Balancer
                  |
        +---------+---------+
        |         |         |
      User      User      User
    Service    Service    Service
```

RabbitMQ allows multiple consumers to process asynchronous events.

The API Gateway provides a single controlled entry point for clients.

Database access remains isolated inside the services that own the data.

---

# 32. Clean Architecture

The User Service follows separation of responsibilities:

```text
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Repositories
   |
   v
Prisma
   |
   v
PostgreSQL
```

Other responsibilities are separated into:

```text
Middleware
Validators
Utils
Events
Config
```

This makes the code easier to maintain and extend.

---

# 33. Testing Flow

Recommended testing order:

```text
1. Start PostgreSQL
        |
        v
2. Start RabbitMQ
        |
        v
3. Start User Service
        |
        v
4. Start Notification Service
        |
        v
5. Start API Gateway
        |
        v
6. Register User
        |
        v
7. Check PostgreSQL
        |
        v
8. USER_CREATED Event
        |
        v
9. RabbitMQ
        |
        v
10. Notification Service
        |
        v
11. Login
        |
        v
12. Receive JWT
        |
        v
13. Access Protected User API
```

APIs can be tested using Postman or Hoppscotch.

---

# 34. Security Checklist

The project includes:

* JWT authentication
* Password hashing
* Environment-based secrets
* Request validation
* Rate limiting
* Centralized error handling
* Database isolation
* Asynchronous service communication
* RabbitMQ messaging
* No REST communication between User Service and Notification Service
* No WebSocket communication between User Service and Notification Service

---

# 35. Files Not to Commit

Never commit:

```text
.env
node_modules/
dist/
```

Use:

```text
.env.example
```

for environment configuration examples.

---

# 36. .gitignore

Recommended root `.gitignore`:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
*.log
```

---

# 37. Final Service Ports

| Component            |  Port | Purpose            |
| -------------------- | ----: | ------------------ |
| API Gateway          |  3000 | Client entry point |
| User Service         |  3001 | User operations    |
| Notification Service |  4002 | Notifications      |
| PostgreSQL           |  5433 | Database           |
| RabbitMQ             |  5672 | Message broker     |
| RabbitMQ Management  | 15672 | RabbitMQ dashboard |

---

# 38. Final Architecture Summary

```text
                         CLIENT
                           |
                           | HTTP
                           v
                  +-------------------+
                  |   API GATEWAY     |
                  |      :3000        |
                  +---------+---------+
                            |
                            | HTTP
                            v
                  +-------------------+
                  |   USER SERVICE    |
                  |      :3001        |
                  +---------+---------+
                            |
                            v
                       PostgreSQL
                        backend

                  USER SERVICE
                       |
                       | Async Event
                       v
                    RabbitMQ
                       |
                       | Async Event
                       v
             NOTIFICATION SERVICE
                       |
                       v
                  PostgreSQL
                 notification_db
```

---

# 39. Assignment Requirements

This implementation covers the requested requirements:

* [x] User Service
* [x] Notification Service
* [x] API Gateway
* [x] Microservices architecture
* [x] RabbitMQ message broker
* [x] Asynchronous communication
* [x] No REST communication between User Service and Notification Service
* [x] No WebSocket communication between User Service and Notification Service
* [x] JWT authentication
* [x] Password hashing
* [x] Request validation
* [x] Error handling
* [x] Rate limiting
* [x] PostgreSQL
* [x] Prisma
* [x] Environment-based configuration
* [x] Event-driven architecture
* [x] Service separation
* [x] Scalable architecture
* [x] Local setup instructions
* [x] API documentation
* [x] Architecture documentation

---

# 40. Author

## Sristi Gupta

Microservices Backend Assignment

