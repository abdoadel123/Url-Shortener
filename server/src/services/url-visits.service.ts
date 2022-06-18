import { IURLVisits } from '@/interfaces/url-visits.interface';
import UrlVisitsModel from '@/models/url-visits.model';
const geoip = require('geoip-lite');

class UrlVisitsService {
  public urlVisits = UrlVisitsModel;

  public async addVisit(code: string, ip: string) {
    console.log(ip);
    const lookup = await geoip.lookup(ip);
    console.log(lookup);

    const visit = await this.urlVisits.create({
      code,
      ip,
      country: lookup?.country,
      city: lookup?.city,
    });
  }

  public async getState(code: string) {
    const visits: IURLVisits[] = await this.urlVisits.find({
      code: code,
    });
    return visits;
  }
}

export default UrlVisitsService;
