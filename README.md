## ⚙️ Backend

BrewBites uses a **microservices-based backend** where different features are handled by separate services.

### Services

* **User Service** — Handles user registration, login, and profiles.
* **Menu Service** — Manages coffee, food items, prices, and availability.
* **Order Service** — Handles cart orders, order details, and order status.
* **Payment Service** — Manages payment processing and payment status.
* **Notification Service** — Sends order and payment notifications.

### How It Works

```text
Frontend
   ↓
API Gateway
   ↓
Microservices
   ├── User Service
   ├── Menu Service
   ├── Order Service
   ├── Payment Service
   └── Notification Service
```

Each service has its own responsibility, making the backend **easy to manage, update, and scale**.
