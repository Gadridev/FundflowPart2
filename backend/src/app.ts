import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import investmentsRoutes from "./routes/investments.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { AppError } from "./utils/AppError.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { swaggerDocs } from "./swagger.js";

const app = express();

app.use(express.json({ limit: "10kb" }));

// Enable CORS for frontend origin (set FRONTEND_URL in env for production)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/investments", investmentsRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

export default app;
