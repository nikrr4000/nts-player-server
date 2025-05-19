import { Site } from "src/server/src/domain/models/site/Site";

export interface SiteRepository {
  create(user: Site): Promise<Site>;
  findById(id: string): Promise<Site | null>;
  findByName(name: string): Promise<Site | null>;
}
