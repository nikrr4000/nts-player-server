import { Site, SiteFactory } from '@domain/models/site/Site';
import { SiteRepository } from '@domain/interfaces/site/SiteRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SiteService {
  constructor(
    @inject('SiteRepository') private siteRepository: SiteRepository
  ) {}

  async createSite(siteData: Pick<Site, 'name' | 'url'>): Promise<Site> {
    const existingSite = await this.siteRepository.findByName(siteData.name);
    
    if (existingSite) {
      throw new BadRequestError(`Site with name ${siteData.name} already exists`);
    }
    
    const site = SiteFactory.create(siteData);
    return this.siteRepository.create(site);
  }

  async getSiteById(id: string): Promise<Site | null> {
    return this.siteRepository.findById(id);
  }

  async getSiteByName(name: string): Promise<Site | null> {
    return this.siteRepository.findByName(name);
  }
}


