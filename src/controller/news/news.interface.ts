import { news } from "@prisma/client";

export interface News {
  id_news?: never;
  category_news_id?: number;
  admin_id?: number;
  title: string;
  content: string;
  created_date?: Date;
  image?: string;
  author?: string;
  updated_by?: number;
  updated_date?: Date;
}

export interface ResponseDataNews {
  err: any;
  data: news;
}

export interface ResponseDataPageNews {
  err: any;
  data: news[];
}

export interface ResponseDataCountNews {
  err: any;
  data: number;
}