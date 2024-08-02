import dotenv from 'dotenv'
import mongoose from 'mongoose'

const config = {
  // Environment setup: uses NODE_ENV if defined, otherwise defaults to 'development'
  env: process.env.NODE_ENV || 'development',
  
  // Port setup: uses PORT if defined, otherwise defaults to 3000
  port: process.env.PORT || 3000,
  
  // JWT secret key: uses JWT_SECRET if defined, otherwise defaults to "YOUR_secret_key"
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  
  // MongoDB URI setup: 
  // - Uses MONGODB_URI if defined,
  // - If not defined, falls back to MONGO_HOST or defaults to a localhost connection with default port 27017 and database name 'mernproject'
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
}

// Export the config object for use in other parts of the application
export default config;
