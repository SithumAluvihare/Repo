import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3001;

connectDB();

const app = express();
// when behind a proxy (fly.io, vercel, etc) trust the first proxy so secure cookies and IPs work correctly
app.set("trust proxy", 1);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configure CORS - allow the frontend hosted origins and localhost for testing
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "https://cc-32.vercel.app,https://cc3.fly.dev,http://localhost:3000").split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: This origin is not allowed."));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // set __dirname to the absolute path of the directory containing the source file
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // make the uploads folder static

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
);
