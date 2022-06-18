import { Router } from 'express';
import UrlsController from '@/controllers/urls.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { EncodeUrlDto } from '@/dtos/urls.dto';

class UrlsRoute implements Routes {
  public path = '';
  public router = Router();
  public urlsController = new UrlsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.urlsController.getUrls);
    this.router.get(`${this.path}/decode/:code`, this.urlsController.encode);;
    this.router.get(`${this.path}/:code`, this.urlsController.redirect);
    this.router.post(`${this.path}/encode`, validationMiddleware(EncodeUrlDto, 'body'), this.urlsController.encode)
  }
}

export default UrlsRoute;
