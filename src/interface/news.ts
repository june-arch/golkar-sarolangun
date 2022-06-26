export interface News {
    id_news?: number;
    category_news_id?: number;
    admin_id?: number;
    title: string;
    content: string;
    created_date: Date;
    image?: string
    publisher?: string;
}