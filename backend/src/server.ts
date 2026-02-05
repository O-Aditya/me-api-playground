import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import apiRoutes from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import prisma from './config/database';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: config.cors.origin,
        credentials: true,
    })
);

// Rate limiting
const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later',
            status: 429,
        },
    },
});

app.use('/api', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

// API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (_req, res) => {
    res.json({
        name: 'Me-API Playground',
        version: '1.0.0',
        description: 'Personal Profile API with Query Capabilities',
        endpoints: {
            health: '/api/health',
            profile: '/api/profile',
            projects: '/api/projects',
            skills: '/api/skills',
            work: '/api/work',
            search: '/api/search',
        },
        documentation: '/api/health',
    });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Endpoint not found',
            status: 404,
        },
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📝 Environment: ${config.nodeEnv}`);
    logger.info(`🌐 CORS enabled for: ${config.cors.origin}`);
});

export default app;
