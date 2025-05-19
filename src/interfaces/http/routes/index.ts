import { Router } from 'express';
import siteRoutes from './siteRoutes';
import { container } from '@shared/container';
import { ScrapperRepository } from '@domain/interfaces';

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

router.get('/repo', async (req, res) => {
  const siteScrapperRepository = container.resolve<ScrapperRepository>("SiteScrapperRepository"); 
  const data = await siteScrapperRepository.getSiteDataByName('nts')
  res.send(data)
})

export default router;