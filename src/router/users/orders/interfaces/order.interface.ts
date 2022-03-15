import { IProduct } from "../../../products/interfaces/product.interface";
export interface IOrder {
  _id: string;
  user_id: string;
  products: [
    {
      product_id: IProduct;
      qty: number;
      discount: number;
      total_price: number;
    }
  ];
  qty: number;
  total_price: number;
  shipping_address: string;
  order_address: string;
  order_email: string;
  status: "pending" | "on the way" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
