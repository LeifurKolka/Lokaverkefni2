export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  platform: string;
  inStock: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}