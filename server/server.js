const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// 1. Security Middlewares
app.use(helmet()); // Sets various HTTP headers for security
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// 2. Optimization & Parsing Middlewares
app.use(compression()); // Compress responses
app.use(express.json({ limit: "10mb" })); // Body parser for JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Body parser for URL encoded data
app.use(cookieParser()); // Parse cookies

// 3. Logging (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// 4. Integrations
const prisma = require('./src/config/prisma');
const errorHandler = require('./src/midlewares/error.middleware');

// Routes
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const courseRoutes = require('./src/routes/course.routes');
const subscriptionRoutes = require('./src/routes/subscription.routes');

// 5. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public/courses', courseRoutes);
app.use('/api/public/subscriptions', subscriptionRoutes);

// 6. Test Route
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ 
      status: 'OK', 
      database: 'Connected', 
      message: 'Server is running smoothly' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected', 
      message: error.message 
    });
  }
});

// 6. Global Error Handler (Must be after routes)
app.use(errorHandler);

// 7. Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Production Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`,
  );
});
