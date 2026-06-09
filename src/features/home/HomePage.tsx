import type { Session } from "@supabase/supabase-js";
import { useMemo, useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../../components/product/ProductCard";
import { useCartStore } from "../../state/cart-store";
import { Header } from "../../components/layout/Header";
import { CartPanel } from "../../components/cart/CartPanel";
import { CheckoutPanel } from "../../components/cart/CheckoutPanel";
import { AuthPanel } from "../../components/auth/AuthPanel";

interface HomePageProps {
  session: Session | null;
}

export function HomePage({ session }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const { data: products = [], isLoading } = useProducts();

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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#2b2d31" }}>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Container maxWidth="lg">
        <Typography variant="body1" sx={{ mb: 4, color: "#d6d6d6" }}>
          Browse games, discover new favorites, and build your cart.
        </Typography>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, backgroundColor: "#d9d9d9" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#111" }}>
            Cart Summary
          </Typography>

          <Typography variant="body1" sx={{ color: "#111" }}>
            Total items: {totalItems}
          </Typography>

          <Typography variant="body1" sx={{ color: "#111" }}>
            Total price: ${totalPrice.toFixed(2)}
          </Typography>
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#f1f1f1" }}>
          Categories
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(category)}
              sx={
                selectedCategory === category
                  ? {
                      backgroundColor: "#1b263b",
                    }
                  : {
                      color: "#d9d9d9",
                      borderColor: "#d9d9d9",
                    }
              }
            >
              {category}
            </Button>
          ))}
        </Stack>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#f1f1f1" }}>
              Games
            </Typography>

            {isLoading ? (
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#d9d9d9" }}>
                <Typography variant="body1" sx={{ color: "#111" }}>
                  Loading games...
                </Typography>
              </Paper>
            ) : filteredProducts.length === 0 ? (
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#d9d9d9" }}>
                <Typography variant="body1" sx={{ color: "#111" }}>
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
            <CheckoutPanel session={session} />
            <AuthPanel
              userEmail={session?.user.email ?? null}
              onSignedIn={() => {}}
              onSignedOut={() => {}}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}