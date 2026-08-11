import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

const users: any[] = [];

// GET USER
app.get("/api/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// CREATE USER
app.post("/api/users", (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      message: "Invalid user data",
    });
  }

  const user = {
    id: Math.floor(Math.random() * 1000).toString(),
    name,
    password,
  };

  users.push(user);

  res.status(201).json({
    message: "User created",
    user,
  });
});

// LOGIN
app.post("/api/users/login", (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = users.find(
    (u) => u.name === name && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.status(200).json({
    message: "Login successful",
    user,
  });
});

app.listen(3001, () => {
  console.log("User service running on port 3001");
});