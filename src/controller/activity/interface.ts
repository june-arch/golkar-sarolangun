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
