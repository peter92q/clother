export interface Product {
    id: number;
    name: string;
    price: number;
    mainpic: string;
    description: string;
    brand: string;
    type: string;
    pictures: { id: number, url: string }[];
    sizes: { id: number, name: string}[];
  }
