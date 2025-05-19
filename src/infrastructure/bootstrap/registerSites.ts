import { SiteRepository } from "@domain/interfaces/site/SiteRepository.js";

export const registerDefaultSites = async () => {
  const { defaultSites } = await import(
    "@infrastructure/config/defaultSitesData.js"
  );
  const { container } = await import("@shared/container.js");
  const { logger } = await import("@infrastructure/logging/logger.js");
  const { SiteFactory } = await import("@domain/models/site/Site.js");

  const siteRepository = container.resolve<SiteRepository>("SiteRepository");

  logger.info(`Starting registering default sites`);
  for (const site of defaultSites) {
    try {
      const newSite = SiteFactory.create(site);
      await siteRepository.create(newSite);

      logger.info(`Registered site with name ${site.name}`);
    } catch (error) {
      logger.error(`Error registering site with name ${site.name}`, error);
    }
  }
};
