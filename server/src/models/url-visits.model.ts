import { model, Schema, Document } from 'mongoose';
import { IURLVisits } from '@/interfaces/url-visits.interface';

const urlVisitsSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true },
);

const UrlVisitsModel = model<IURLVisits & Document>('UrlVisits', urlVisitsSchema);

export default UrlVisitsModel;
