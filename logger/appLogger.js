import { configDotenv } from "dotenv";
import winston from "winston";
import config from "config";
import fs from "fs-extra";

configDotenv();
const environment = process.env.NODE_ENV;

const logsDir = "logs";
fs.ensureDirSync(logsDir);

const appLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || config.get("winston.level"),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        environment === "production"
        ? new winston.transports.File({filename: path.join(logsDir, "app.log")})
        : new winston.transports.Console()
    ]
})

export default appLogger;