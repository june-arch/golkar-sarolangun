import { category_activity } from "@prisma/client";

export interface ActivityCategory {
  id_category_activity?: number;
  name?: string;
  description?: string;
}

export interface ResponseDataCatActivity {
  err: any;
  data: category_activity;
}

export interface ResponseDataPageCatActivity {
  err: any;
  data: category_activity[];
}

export interface ResponseDataCountCatActivity {
  err: any;
  data: number;
}