export interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  localFileName: string; // Reference for the user's local file
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartState = Record<number, number>; // Product ID -> Quantity