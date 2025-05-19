import { Site } from "src/server/src/domain/models/site/Site";
import { SiteService } from "src/server/src/application/services/SiteService";
import { injectable, inject } from "tsyringe";

interface CreateSiteRequest {
  url: string;
  name: string;
}

interface CreateSiteResponse {
  site: Site;
}

@injectable()
export class CreateSiteUseCase {
  constructor(@inject(SiteService) private siteService: SiteService) {}

  async execute(request: CreateSiteRequest): Promise<CreateSiteResponse> {
    const site = await this.siteService.createSite({
      url: request.url,
      name: request.name,
    });

    return { site };
  }
}
