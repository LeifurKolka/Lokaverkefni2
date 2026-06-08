import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/product";
import { ProductCard } from "../../components/product/ProductCard";
import { useCartStore } from "../../state/cart-store";
import { Header } from "../../components/layout/Header";
import { CartPanel } from "../../components/cart/CartPanel";
import { CheckoutPanel } from "../../components/cart/CheckoutPanel";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.platform.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7f7fb" }}>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Container maxWidth="lg">
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse games, discover new favorites, and build your cart.
        </Typography>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Cart Summary
          </Typography>

          <Typography variant="body1">Total items: {totalItems}</Typography>

          <Typography variant="body1">
            Total price: ${totalPrice.toFixed(2)}
          </Typography>
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Categories
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Stack>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              Games
            </Typography>

            {filteredProducts.length === 0 ? (
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="body1">
                  No games matched your search or category filter.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CartPanel />
            <CheckoutPanel />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}