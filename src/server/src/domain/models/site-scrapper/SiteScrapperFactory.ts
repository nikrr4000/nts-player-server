import { inject, injectable } from "tsyringe";
import { Site } from "../site/Site";
import { SiteScrapingDataRecord } from "./SiteScrapperData";
import { ISiteScrapperAdapter } from "src/server/src/domain/interfaces/site-scrapper/SiteScrapperAdapter";
import { ScrapperStreamsAdapter } from "src/server/src/domain/interfaces/site-scrapper/ScrapperStreamsAdapter";
import { ParticularSiteScrapper, SiteScrapper } from "./SiteScrapper";

export interface ISiteScrapperFactory<B, P> {
  create: (
    site: Site,
    siteData: SiteScrapingDataRecord,
    browser: ISiteScrapperAdapter<B, P>,
    streamsAdapter: ScrapperStreamsAdapter<P>
  ) => Promise<SiteScrapper>;
}

@injectable()
export class SiteScrapperFactory<B, P> implements ISiteScrapperFactory<B, P> {
  constructor(
    @inject("SiteScrapperAdapter")
    private browserAdapter: ISiteScrapperAdapter<B, P>,
    @inject("ScrapperStreamsAdapter")
    private streamsAdapter: ScrapperStreamsAdapter<P>
  ) {}
  async create<B, P>(
    site: Site,
    siteData: SiteScrapingDataRecord
  ): Promise<SiteScrapper> {
    const [scrapperName, scrapperData] = Object.entries(siteData)[0];
    if (site.name !== scrapperName) {
      throw new Error(
        "Site name and site scraping data site name are incompatible"
      );
    }

    const scrapingSiteEntity = {
      ...site,
      ...scrapperData,
    };

    await this.browserAdapter.launchBrowser();
    await this.browserAdapter.newPage();

    return new ParticularSiteScrapper(
      scrapingSiteEntity,
      this.browserAdapter,
      this.streamsAdapter
    );
  }
}
