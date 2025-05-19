import { ScrapperRepository } from "@domain/interfaces";

export const registerDefaultScrapperData = async () => {
  const { siteScrappingConfig } = await import(
    "@infrastructure/config/defaultSitesData.js"
  );
  const { container } = await import("@shared/container.js");
  const { logger } = await import("@infrastructure/logging/logger.js");
  const { SiteScrapperDataFactory } = await import("@domain/models/index.js");

  const siteScrapperRepository = container.resolve<ScrapperRepository>(
    "SiteScrapperRepository"
  );

  logger.info(`Starting registering default sites data`);
  const scrapperData = SiteScrapperDataFactory.create(siteScrappingConfig);

  return await siteScrapperRepository.createSiteData(scrapperData);
};
