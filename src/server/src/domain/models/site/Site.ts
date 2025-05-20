import { SiteValidator, Site } from '@server-shared/types';

export {SiteValidator, Site}

export class SiteFactory {
  static create(data: Omit<Site, 'id'>): Site {    
    return {
      id: crypto.randomUUID(),
      ...data,
    };
  }
}
