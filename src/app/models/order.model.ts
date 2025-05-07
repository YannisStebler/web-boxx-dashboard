export interface Order {
    id: string;
    products: { [productName: string]: number };
    totalAmount: number;
    timestamp: number;
    completed: boolean;
    orderNumber: number;
}