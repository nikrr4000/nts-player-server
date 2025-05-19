import { Site } from "src/server/src/domain/models/site/Site";
import {
  SiteScrapingDataRecord,
  SiteScrapingScenraio,
} from "src/server/src/domain/models";

export const ntsDataRaw: SiteScrapingDataRecord = {
  nts: {
    scenarios: [
      {
        "get-first-stream": {
          description: "Action gets first live channel",
          actions: [
            {
              action: "click",
              selector: "live-channel.live-channel--collapsed",
            },
          ],
        },
      },
    ],
  },
};

export const siteScrappingConfig: SiteScrapingDataRecord = { ...ntsDataRaw };

export const defaultSites: Omit<Site, "id">[] = [
  {
    name: "nts",
    url: "https://www.nts.live",
  },
];
