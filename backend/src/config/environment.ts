import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        url: process.env.DATABASE_URL || '',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
    rateLimit: {
        max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000'),
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-this',
    },
};
