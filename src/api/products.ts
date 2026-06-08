import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

supabase.from("table_name").select()

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch product by slug:", error);
    return null;
  }

  return data;
}