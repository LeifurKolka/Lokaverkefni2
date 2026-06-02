import { useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useCartStore } from "../../state/cart-store";

interface FakeOrder {
  orderNumber: string;
  fullName: string;
  email: string;
  total: number;
}

export function CheckoutPanel() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [completedOrder, setCompletedOrder] = useState<FakeOrder | null>(null);

  const handleCheckout = () => {
    if (!fullName.trim() || !email.trim() || items.length === 0) return;

    const fakeOrder: FakeOrder = {
      orderNumber: `ORD-${Date.now()}`,
      fullName,
      email,
      total: totalPrice,
    };

    clearCart();
    setCompletedOrder(fakeOrder);
    setFullName("");
    setEmail("");
  };

  const handleContinueShopping = () => {
    setCompletedOrder(null);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Fake Checkout
      </Typography>

      {completedOrder ? (
        <Box sx={{ display: "grid", gap: 2 }}>
          <Alert severity="success">
            Your fake order was completed successfully.
          </Alert>

          <Typography variant="body1">
            <strong>Order number:</strong> {completedOrder.orderNumber}
          </Typography>

          <Typography variant="body1">
            <strong>Name:</strong> {completedOrder.fullName}
          </Typography>

          <Typography variant="body1">
            <strong>Email:</strong> {completedOrder.email}
          </Typography>

          <Typography variant="body1">
            <strong>Total:</strong> ${completedOrder.total.toFixed(2)}
          </Typography>

          <Button variant="contained" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No real payment is processed. This is only a simulated checkout.
          </Typography>

          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Order total: ${totalPrice.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Place Fake Order
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}