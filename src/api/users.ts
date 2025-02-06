import { AppDataSource } from '../utils/dataSource';
import userRoutes from '../routes/user.routes';
import express from 'express';

const app = express();

// Ensure database is connected first
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connected to PostgreSQL database');
    
    // Mount the user routes here (similar to your existing logic)
    app.use('/api/users', userRoutes);

    // Route handler for /users
    app.get('/', userRoutes);

  })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL database:', err);
    process.exit(1);
  });

// Vercel expects the handler to be exported
export default app;
