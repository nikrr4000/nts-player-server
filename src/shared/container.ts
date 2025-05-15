import { container } from 'tsyringe';

import { SiteRepository } from '@domain/repositories/SiteRepository';
import { InMemorySiteRepository } from '@infrastructure/repositories/InMemorySiteRepository';

import { SiteService } from '@application/services/SiteService';
import { CreateSiteUseCase } from '@application/use-cases/CreateSiteUseCase';

container.registerSingleton<SiteRepository>('SiteRepository', InMemorySiteRepository);
container.registerSingleton(SiteService);
container.registerSingleton(CreateSiteUseCase);

export { container };
