import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { useCartStore } from "../../state/cart-store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card sx={{ height: "100%" }}>
      <Box
        component={Link}
        to={`/products/${product.slug}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image_url}
          alt={product.title}
        />

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.category} • {product.platform}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography
            variant="body2"
            color={product.in_stock ? "success.main" : "error.main"}
            sx={{ mt: 1, mb: 2 }}
          >
            {product.in_stock ? "In stock" : "Out of stock"}
          </Typography>
        </CardContent>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!product.in_stock}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}