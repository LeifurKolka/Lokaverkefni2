export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  platform: string;
  in_stock: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}