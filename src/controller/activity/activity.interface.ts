import { activity } from "@prisma/client";

export interface Activity {
  id_activity?: number;
  admin_id: number;
  category_activity_id: number;
  title: string;
  created_date: Date;
  image?: string;
  video?: string;
  updated_by?: number;
  updated_date?: Date;
}

export interface ActivityDTO {
  title: string,
  category_activity_id: number,
  image: string,
  video: string,
}

export interface ParamsActivity {
  page: string;
  limit: string;
  debouncedSearch?: string;
}

export interface ResponseDataActivity {
  err: any;
  data: activity;
}

export interface ResponseDataPageActivity {
  err: any;
  data: activity[];
}

export interface ResponseDataCountActivity {
  err: any;
  data: number;
}