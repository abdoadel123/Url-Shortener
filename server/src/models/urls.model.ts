import { model, Schema, Document } from 'mongoose';
import { IURL } from '@/interfaces/url.interface';

const urlSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortestUrl: {
      type: String,
      required: true,
    },
    visitors: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const urlsModel = model<IURL & Document>('Urls', urlSchema);

export default urlsModel;
