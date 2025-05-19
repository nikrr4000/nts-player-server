import { container } from 'tsyringe';

import { SiteRepository } from '@domain/interfaces/site/SiteRepository';
import { InMemorySiteRepository } from '@infrastructure/repositories/InMemorySiteRepository';

import { SiteService } from '@application/services/SiteService';
import { CreateSiteUseCase } from '@application/use-cases/CreateSiteUseCase';
import { ScrapperRepository } from '@domain/interfaces';
import { InMemorySiteScrapperRepository } from '@infrastructure/repositories/InMemorySiteScrapperRepository';

container.registerSingleton<SiteRepository>('SiteRepository', InMemorySiteRepository);
container.registerSingleton<ScrapperRepository>('SiteScrapperRepository', InMemorySiteScrapperRepository);

container.registerSingleton(SiteService);
container.registerSingleton(CreateSiteUseCase);

export { container };
