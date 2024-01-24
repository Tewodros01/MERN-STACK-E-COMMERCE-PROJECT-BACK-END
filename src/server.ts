import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import socketIO from "socket.io";
import http from "http";
import indexRoutes from "./routes/index.route";
import connectDB from "./config/db.conn";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import messageService from "./services/message.service";
import { IMessageDocument } from "./models/message.model";
import { UserModel } from "./models/user.model";

// Initializations
const app: express.Application = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Settings
app.set("port", process.env.PORT || 3500);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/api", indexRoutes);

// Public
app.use("/uploads", express.static(path.resolve("uploads")));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a room based on the user ID
  socket.on("joinRoom", async (userId: string) => {
    socket.join(userId);
  });

  // Listen for new chat messages
  socket.on("newMessage", async ({ sender, receiver, content }) => {
    try {
      // Check if both sender and receiver exist
      const senderUser = await UserModel.findById(sender);
      const receiverUser = await UserModel.findById(receiver);

      if (!senderUser || !receiverUser) {
        console.error("Sender or receiver not found");
        return;
      }

      const newMessage: IMessageDocument = await messageService.addMessage(
        sender,
        receiver,
        content,
      );

      // Emit the new message to the receiver's room
      io.to(receiver).emit("receiveMessage", newMessage.toJSON());
      // Optionally, you can also emit the message to the sender's room
      io.to(sender).emit("sentMessage", newMessage.toJSON());
    } catch (error: any) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

(async () => {
  try {
    await connectDB();
    server.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (e) {
    console.log(e);
  }
})();
