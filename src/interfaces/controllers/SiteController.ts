import { Request, Response, NextFunction } from 'express';
import { CreateSiteUseCase } from '@application/use-cases/CreateSiteUseCase';
import { SiteService } from '@application/services/SiteService';
import { NotFoundError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SiteController {
  constructor(
    @inject(CreateSiteUseCase) private createSiteUseCase: CreateSiteUseCase,
    @inject(SiteService) private siteService: SiteService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { site } = await this.createSiteUseCase.execute(req.body);
      res.status(201).json({ status: 'success', data: { site } });
    } catch (error) {
      next(error);
    }
  }

  async getByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const site = await this.siteService.getSiteByName(req.params.name);
      
      if (!site) {
        throw new NotFoundError(`Site with name ${req.params.name} not found`);
      }
      
      res.status(200).json({ status: 'success', data: { site } });
    } catch (error) {
      next(error);
    }
  }
}
