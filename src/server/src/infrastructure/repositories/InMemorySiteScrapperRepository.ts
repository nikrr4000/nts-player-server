import { ScrapperRepository } from "src/server/src/domain/interfaces/site-scrapper/ScrapperRepository";
import {
  SiteScrapingDataObj,
  SiteScrapingDataRecord,
} from "src/server/src/domain/models/site-scrapper/SiteScrapperData";

export class InMemorySiteScrapperRepository implements ScrapperRepository {
  private scrapperMap = new Map<string, SiteScrapingDataObj>();

  async createSiteData(data: SiteScrapingDataRecord) {
    const entries = Object.entries(data);
    for (const [key, value] of entries) {
      this.scrapperMap.set(key, value);
    }
    return data;
  }
  async getSiteDataByName(name: string) {
    const data = this.scrapperMap.get(name);
    return data || null;
  }
  async getSitesData() {
    return Object.fromEntries(this.scrapperMap.entries());
  }
}
