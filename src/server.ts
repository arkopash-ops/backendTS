import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Backend Connected."
    });
});

interface User {
    _id: number;
    name: string;
}

let users: User[] = [
    { _id: 1, name: "Abhi" },
    { _id: 2, name: "Mohit" }
];

// user routes
// Create new User
app.post("/addUsers", (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name is required and must be a non-empty string"
        });
    }

    const newUser: User = {
        _id: users.length + 1,
        name: name.trim()
    };

    users.push(newUser);

    return res.status(201).json({
        success: true,
        message: `User ${newUser.name} created with ID: ${newUser._id}!`,
        user: newUser
    });
});

// Get all Users
app.get("/getUsers", (req: Request, res: Response) => {
    if (users.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No users found",
            users: []
        });
    }

    return res.status(200).json({
        success: true,
        users
    });
});

// Delete User by ID
app.delete("/deleteUser/:id", (req: Request<{ id: string }>, res: Response) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    const userExists = users.some(u => u._id === userId);

    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${userId} not found`
        });
    }

    users = users.filter(u => u._id !== userId);

    return res.status(200).json({
        success: true,
        message: `User with ID ${userId} deleted permanently!`
    });
});

// Search User by name
app.get("/searchUser", (req: Request, res: Response) => {
    const name = req.query.name?.toString().toLowerCase() || "";

    const searchUser = users.filter(u =>
        u.name.toLowerCase().includes(name)
    );

    if (searchUser.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No user found matching string: ${name}`
        });
    }

    return res.status(200).json({
        success: true,
        message: `Found user matching string: ${name}`,
        users: searchUser
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
