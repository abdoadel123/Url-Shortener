import { HttpException } from '@exceptions/HttpException';
import { IURL } from '@/interfaces/url.interface';
import UrlsModel from '@/models/urls.model';
import { isEmpty } from '@utils/util';
import { BASEURL } from '@/config';

const shortid = require('shortid');

class UrlService {
  public urls = UrlsModel;

  public async findAllUrls(): Promise<IURL[]> {
    const urls: IURL[] = await this.urls.find().lean() as IURL[];
    return urls;
  }

  public async findUrlByCode(code: string): Promise<IURL> {
    if (isEmpty(code)) throw new HttpException(400, 'code not found');

    const findUrl: IURL = await this.urls.findOne({ code: code });
    if (!findUrl) throw new HttpException(409, 'Url not found');

    return findUrl;
  }

  public async createUrl(originalUrl: string): Promise<IURL> {
    if (isEmpty(originalUrl)) throw new HttpException(400, 'original url not valid');

    let code: string = '';
    let findUrl: IURL = null;

    do {
      code = shortid.generate();
      findUrl = await this.urls.findOne({ code: code });
    } while (findUrl);

    const shortestUrl=`${BASEURL}/${code}`
    return await this.urls.create({ code, originalUrl,shortestUrl });
  }

  public async updateVisitore(code: string): Promise<void> {
    const url = await this.urls.findOne({ code: code });
    url.visitors += 1;
    await this.urls.findOneAndUpdate({ code }, { ...url });
  }
}

export default UrlService;
