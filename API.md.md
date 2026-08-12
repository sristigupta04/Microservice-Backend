# API Documentation

Base URL:

`http://localhost:3000`

## API Gateway

### GET /health

Checks whether the API Gateway is running.

Response:

``` json
{
  "success": true,
  "message": "API Gateway is running",
  "service": "api-gateway"
}
```

### POST /users/register

Registers a new user.

Request:

``` json
{
  "name": "Sristi",
  "email": "sristi@test.com",
  "password": "123456"
}
```

### POST /users/login

Authenticates a user and returns a JWT.

Request:

``` json
{
  "email": "sristi@test.com",
  "password": "123456"
}
```

### GET /users/:id

Protected endpoint.

Header:

``` text
Authorization: Bearer <token>
```

Example:

``` text
GET http://localhost:3000/users/<user-id>
```

## Notification Service

Base URL:

`http://localhost:4002`

### POST /notifications

Creates a notification.

Request:

``` json
{
  "userId": "<user-id>",
  "message": "Welcome Sristi",
  "type": "WELCOME"
}
```

Example response:

``` json
{
  "success": true,
  "data": {
    "id": "<notification-id>",
    "userId": "<user-id>",
    "message": "Welcome Sristi",
    "type": "WELCOME",
    "isRead": false
  }
}
```

## Event

RabbitMQ event:

``` text
USER_CREATED
```

Payload:

``` json
{
  "event": "USER_CREATED",
  "data": {
    "userId": "<user-id>",
    "email": "user@example.com",
    "name": "User"
  }
}
```

User Service publishes the event and Notification Service consumes it
asynchronously.
