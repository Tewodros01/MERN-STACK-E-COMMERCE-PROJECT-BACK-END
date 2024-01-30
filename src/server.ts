import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import http from "http";
import indexRoutes from "./routes/index.route";
import connectDB from "./config/db.conn";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";

// Initializations
const app: express.Application = express();
const server = http.createServer(app);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Settings
app.set("port", process.env.PORT || 3000);

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

(async () => {
  try {
    await connectDB();
    server.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (e) {
    console.log(e);
  }
})();
