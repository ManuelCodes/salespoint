export interface ClientData {
    id?: string;
    name: string;
    lastName: string;
    email?: string;
}

export interface SaleItemData {
    //
    id?: string;
    description: string;
    model: string;
    price: number | string;
    stocked: number | string;
}