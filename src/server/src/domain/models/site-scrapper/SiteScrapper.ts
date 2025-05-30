import { inject, injectable } from "tsyringe";
import { Site } from "../site/Site";
import { SiteScrapingDataObj, SiteScrapingScenraio } from "./SiteScrapperData";
import {
  BrowserActions,
  BrowserActionsParams,
  ISiteScrapperAdapter,
} from "src/server/src/domain/interfaces/site-scrapper/SiteScrapperAdapter";
import { ScrapperStreamsAdapter } from "src/server/src/domain/interfaces/site-scrapper/ScrapperStreamsAdapter";

export type ScrapingSiteEntity = Site & SiteScrapingDataObj;

export interface SiteScrapper {
  getScenario: (name: string) => SiteScrapingScenraio | undefined;
  performScenario: (name: string) => void;
  performAction: (
    action: BrowserActions,
    args: BrowserActionsParams
  ) => Promise<void>;
  getStream: <T, O>(options: O) => Promise<T>;
}

@injectable()
export class ParticularSiteScrapper<B, P> implements SiteScrapper {
  private readonly scrapingEntity: ScrapingSiteEntity;

  constructor(
    scrapingSiteEntity: ScrapingSiteEntity,
    @inject("SiteScrapperAdapter") private scrapper: ISiteScrapperAdapter<B, P>,
    @inject("ScrapperStreamsAdapter")
    private streamsAdapter: ScrapperStreamsAdapter<P>
  ) {
    this.scrapingEntity = scrapingSiteEntity;
  }

  getScenario(name: string) {
    const scenario = this.scrapingEntity.scenarios.find((s) => s[name]);
    return scenario ? scenario[name] : undefined;
  }

  async performScenario(name: string) {
    const scenario = this.getScenario(name);
    if (!scenario) {
      throw new Error(
        `No scenario with name ${name} related to site ${this.scrapingEntity.url}`
      );
    }

    for (const act of scenario.actions) {
      const { action, ...args } = act;
      await this.performAction(action, args);
    }
  }

  async performAction(action: BrowserActions, args: BrowserActionsParams) {
    const actionFn = this.scrapper.actions[action];
    if (!actionFn) {
      throw new Error(`No action "${action}" in current browser adapter`);
    }
    await actionFn(args);
  }

  async getStream<T, O>(options: O) {
    return this.streamsAdapter.getStream<T, O>(
      this.scrapper.currentPage,
      options
    );
  }
}
