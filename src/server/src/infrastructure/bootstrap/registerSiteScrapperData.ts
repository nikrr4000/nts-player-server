import { ScrapperRepository } from "src/server/src/domain/interfaces";

export const registerDefaultScrapperData = async () => {
  const { siteScrappingConfig } = await import(
    "src/server/src/infrastructure/config/defaultSitesData.js"
  );
  const { container } = await import("src/server/src/shared/container.js");
  const { logger } = await import(
    "src/server/src/infrastructure/logging/logger.js"
  );
  const { SiteScrapperDataFactory } = await import(
    "src/server/src/domain/models/index.js"
  );

  const siteScrapperRepository = container.resolve<ScrapperRepository>(
    "SiteScrapperRepository"
  );

  logger.info(`Starting registering default sites data`);
  const scrapperData = SiteScrapperDataFactory.create(siteScrappingConfig);

  return await siteScrapperRepository.createSiteData(scrapperData);
};
