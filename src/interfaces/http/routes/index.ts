import { Router } from 'express';
import userRouter from './userRoutes';

const router = Router();

router.use('/users', userRouter);

// Маршрут здоровья приложения
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;