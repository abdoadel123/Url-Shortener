import { NextFunction, Request, Response } from 'express';
import { IURL } from '@/interfaces/url.interface';
import UrlService from '@/services/url.service';
import UrlVisitsService from '@/services/url-visits.service';

import { EncodeUrlDto } from '@/dtos/urls.dto';

class UrlsController {
  public urlsService = new UrlService();
  public urlVisitsService = new UrlVisitsService();

  public getUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUrlsData: IURL[] = await this.urlsService.findAllUrls()
      const urlsWithVisits = await Promise.all(
        findAllUrlsData.map(async url => {
          url.visits = await this.urlVisitsService.getState(url.code);
          return url;
        }),
      );
      res.status(200).json({ data: urlsWithVisits, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public redirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code: string = req.params.code;
      const url: IURL = await this.urlsService.findUrlByCode(code);
      this.urlsService.updateVisitore(url.code);
      this.urlVisitsService.addVisit(code, req.ip);
      res.status(301).redirect(url.originalUrl);
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  public encode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const urlData: EncodeUrlDto = req.body;
      const createUserData: IURL = await this.urlsService.createUrl(urlData.originalUrl);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public decode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code: string = req.params.code;
      const { originalUrl }: IURL = await this.urlsService.findUrlByCode(code);
      res.status(201).json({ data: { originalUrl }, message: 'data retreved' });
    } catch (error) {
      next(error);
    }
  };
}

export default UrlsController;
