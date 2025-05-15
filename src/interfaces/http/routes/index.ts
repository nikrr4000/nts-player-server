import { Router } from 'express';
import siteRoutes from './siteRoutes';

const router = Router();

router.use('/sites', siteRoutes);

// Маршрут здоровья приложения
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;