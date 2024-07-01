export interface Product {
  id?: number;
  name: string;
  picture: string;
  stock: number;
  price: number;
}

export interface Invoice {
  id?: number;
  date: string;
  customerName: string;
  salespersonName: string;
  notes?: string;
  products: Product[];
  totalAmount: number;
}
