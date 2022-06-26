export interface Activity {
    id_activity?: number;
    admin_id: number;
    category_activity_id: number;
    tittle: string;
    content: string;
    created_date: Date;
    image: string;
    video: string;
}