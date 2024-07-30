export interface ICourse {
    id: string;
    title: string;
    description?: string;
    thumbnail: string;
    students: number;
    regular_price: number;
    sale_price: number;
    total_time: number;
}
