import { IURLVisit } from "./visit.interface";

export interface IURL {
  code: string;
  originalUrl: string;
  shortestUrl: string;
  visitors: number;
  visits:IURLVisit[]
}
