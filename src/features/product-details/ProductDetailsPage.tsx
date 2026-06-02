import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { mockProducts } from "../products/mock-products";
import { useCartStore } from "../../state/cart-store";

export function ProductDetailsPage() {
  const { slug } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const product = useMemo(
    () => mockProducts.find((item) => item.slug === slug),
    [slug]
  );

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Product not found
        </Typography>

        <Button component={Link} to="/" variant="contained">
          Back to Store
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f7f7fb", py: 4 }}>
      <Container maxWidth="md">
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
          Back to Store
        </Button>

        <Card>
          <CardMedia
            component="img"
            height="360"
            image={product.imageUrl}
            alt={product.title}
          />

          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {product.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {product.category} • {product.platform}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography
              variant="body2"
              color={product.inStock ? "success.main" : "error.main"}
              sx={{ mb: 3 }}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </Typography>

            <Button
              variant="contained"
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}