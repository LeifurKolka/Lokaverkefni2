import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts } from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: Boolean(slug),
  });
}