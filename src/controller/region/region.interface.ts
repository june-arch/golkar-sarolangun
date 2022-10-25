import { region } from "@prisma/client";

export interface Region {
  id_regional?: number;
  name?: string;
  kemendagri_code?: string;
}

export interface ResponseDataRegion {
  err: any;
  data: region;
}

export interface ResponseDataPageRegion {
  err: any;
  data: region[];
}

export interface ResponseDataCountRegion {
  err: any;
  data: number;
}