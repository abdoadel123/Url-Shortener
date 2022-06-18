import { IURLVisits } from "./url-visits.interface";

export interface IURL {
  code: string;
  originalUrl: string;
  shortestUrl:string
  visitors: number;
  visits?:IURLVisits[]
}
