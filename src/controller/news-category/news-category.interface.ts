import { category_news } from "@prisma/client";

export interface NewsCategory {
  id_category_news?: number;
  name: string;
  description: string;
}

export interface ResponseDataCatNews {
  err: any;
  data: category_news;
}

export interface ResponseDataPageCatNews {
  err: any;
  data: category_news[];
}

export interface ResponseDataCountCatNews {
  err: any;
  data: number;
}