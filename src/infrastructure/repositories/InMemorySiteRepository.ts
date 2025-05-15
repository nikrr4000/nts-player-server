import { Site } from '@domain/entities/Site';
import { SiteRepository } from '@domain/repositories/SiteRepository';

export class InMemorySiteRepository implements SiteRepository {
  private sites: Map<string, Site> = new Map();

  async findById(id: string): Promise<Site | null> {
    return this.sites.get(id) || null;
  }

  async findByName(name: string): Promise<Site | null> {
    for (const site of this.sites.values()) {
      if (site.name === name) {
        return site;
      }
    }
    return null;
  }

  async create(site: Site): Promise<Site> {
    if (!site.id) {
      throw new Error('site must have an ID');
    }
    
    this.sites.set(site.id, site);
    return site;
  }
}
