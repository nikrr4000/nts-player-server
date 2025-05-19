import { container } from "tsyringe";

import { SiteRepository } from "src/server/src/domain/interfaces/site/SiteRepository";
import { InMemorySiteRepository } from "src/server/src/infrastructure/repositories/InMemorySiteRepository";

import { SiteService } from "src/server/src/application/services/SiteService";
import { CreateSiteUseCase } from "src/server/src/application/use-cases/CreateSiteUseCase";
import { ScrapperRepository } from "src/server/src/domain/interfaces";
import { InMemorySiteScrapperRepository } from "src/server/src/infrastructure/repositories/InMemorySiteScrapperRepository";

container.registerSingleton<SiteRepository>(
  "SiteRepository",
  InMemorySiteRepository
);
container.registerSingleton<ScrapperRepository>(
  "SiteScrapperRepository",
  InMemorySiteScrapperRepository
);

container.registerSingleton(SiteService);
container.registerSingleton(CreateSiteUseCase);

export { container };
