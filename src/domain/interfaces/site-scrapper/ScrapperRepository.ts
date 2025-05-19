import { SiteScrapingDataObj, SiteScrapingDataRecord } from "@domain/models/site-scrapper/SiteScrapperData";

export interface ScrapperRepository {
    createSiteData: (data: SiteScrapingDataRecord) => Promise<SiteScrapingDataRecord>
    getSiteDataByName: (name:string) => Promise<SiteScrapingDataObj | null>;
    getSitesData: () => Promise<SiteScrapingDataRecord>;
}