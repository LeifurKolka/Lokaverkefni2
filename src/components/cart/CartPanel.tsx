import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "../../state/cart-store";

export function CartPanel() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Cart
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {items.map((item) => (
              <Box key={item.product.id}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {item.product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  ${item.product.price.toFixed(2)} each
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
                  <IconButton
                    size="small"
                    onClick={() => decreaseQuantity(item.product.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography variant="body1">{item.quantity}</Typography>

                  <IconButton
                    size="small"
                    onClick={() => increaseQuantity(item.product.id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography variant="body2">
                  Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>

          <Button variant="outlined" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </Paper>
  );
}