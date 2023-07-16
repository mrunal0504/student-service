/**
 * Logging framework configuration
 */

import winston from 'winston'

// Define the logger configuration
const logger = winston.createLogger({
    level: 'debug', // Set the log level
    format: winston.format.json(), // Use JSON format for logs
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logs.log' }), // Log to a file
    ],
});

export default logger;
