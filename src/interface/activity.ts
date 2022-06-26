export interface Activity {
    id_activity?: number;
    admin_id: number;
    category_activity_id: number;
    title: string;
    content: string;
    created_date: Date;
    image: string;
    video: string;
}