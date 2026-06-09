import type { CartItem, CheckoutFormData } from "../types/cart";

export interface FakeOrder {
  orderNumber: string;
  fullName: string;
  email: string;
  total: number;
}

export function createFakeOrder(
  formData: CheckoutFormData,
  items: CartItem[],
  total: number
): FakeOrder | null {
  if (!formData.fullName.trim()) return null;
  if (!formData.email.trim()) return null;
  if (items.length === 0) return null;

  return {
    orderNumber: `ORD-${Date.now()}`,
    fullName: formData.fullName,
    email: formData.email,
    total,
  };
}