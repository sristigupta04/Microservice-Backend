# Microservices Assignment

A small microservices-based backend system with a User Service,
Notification Service, and API Gateway.

## Architecture

The system uses RabbitMQ for asynchronous communication between the User
Service and Notification Service. The API Gateway is the client-facing
entry point.

**Flow:**

Client → API Gateway → User Service

User Service → RabbitMQ → Notification Service

## Services

  ------------------------------------------------------------------------
  Service                                       Port Responsibility
  --------------------- ---------------------------- ---------------------
  API Gateway                                   3000 Routing, JWT
                                                     authentication, rate
                                                     limiting

  User Service                                  3001 Registration, login,
                                                     user management

  Notification Service                          4002 Notification creation
                                                     and event consumption

  RabbitMQ                                      5672 Asynchronous event
                                                     broker

  PostgreSQL                                    5433 User/notification
                                                     persistence
  ------------------------------------------------------------------------

## Technology

-   Node.js
-   TypeScript
-   Express
-   Prisma ORM
-   PostgreSQL
-   RabbitMQ (`amqplib`)
-   JWT
-   bcryptjs
-   Axios
-   express-rate-limit
-   dotenv

## Communication

User Service publishes a `USER_CREATED` event to RabbitMQ after
successful registration.

Notification Service consumes the event asynchronously.

The User Service and Notification Service do not use REST or WebSockets
to communicate with each other.

## Security

-   JWT authentication for protected user APIs.
-   Shared JWT secret is stored in environment variables.
-   Passwords are hashed with bcrypt.
-   Request validation is implemented.
-   API Gateway rate limiting is enabled.
-   Secrets and database URLs are kept in `.env`.

For production deployment, RabbitMQ should use authenticated/TLS
connections and secrets should be managed by a secret manager.

## Local Setup

### 1. Configure environment variables

Create `.env` files for each service.

Example User Service:

``` env
PORT=3001
NODE_ENV=development
JWT_SECRET=your_secret
RABBITMQ_URL=amqp://localhost:5672
DATABASE_URL=postgresql://postgres:password@localhost:5433/user_db?schema=public
```

Example Notification Service:

``` env
PORT=4002
NODE_ENV=development
RABBITMQ_URL=amqp://localhost:5672
DATABASE_URL=postgresql://postgres:password@localhost:5433/notification_db?schema=public
```

Example API Gateway:

``` env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret
USER_SERVICE_URL=http://localhost:3001
RABBITMQ_URL=amqp://localhost:5672
```

### 2. Start infrastructure

Start PostgreSQL and RabbitMQ.

Create the required databases:

-   `user_db`
-   `notification_db`

### 3. Install dependencies

Run `npm install` inside each service directory.

### 4. Run Prisma

Inside each service that uses Prisma:

``` bash
npx prisma migrate dev
```

### 5. Start services

Run each service in a separate terminal:

``` bash
cd user-service
npm run dev
```

``` bash
cd notification-side
npm run dev
```

``` bash
cd api-gateway
npm run dev
```

## Test Flow

1.  Register a user through the API Gateway.
2.  Login and receive a JWT.
3.  Use the JWT to call the protected user endpoint.
4.  User Service publishes `USER_CREATED`.
5.  Notification Service consumes the event.
6.  Create a notification through the Notification Service API.

## Documentation

See `API.md` for endpoint details.

## Architecture Diagram

See `architecture.png`.
