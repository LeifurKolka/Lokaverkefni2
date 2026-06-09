import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cart-store";
import type { Product } from "../types/product";

const mockProduct: Product = {
  id: "1",
  title: "Cyber Quest 2077",
  slug: "cyber-quest-2077",
  description: "An open-world sci-fi RPG set in a futuristic city.",
  price: 59.99,
  image_url: "https://example.com/cyber-quest.jpg",
  category: "RPG",
  platform: "PC",
  in_stock: true,
  featured: true,
};

describe("cart-store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("adds a product to the cart", () => {
    useCartStore.getState().addToCart(mockProduct);

    const state = useCartStore.getState();

    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe("1");
    expect(state.items[0].quantity).toBe(1);
  });

  it("increases quantity when the same product is added again", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);

    const state = useCartStore.getState();

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("calculates total items and total price correctly", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);

    const state = useCartStore.getState();

    expect(state.getTotalItems()).toBe(2);
    expect(state.getTotalPrice()).toBeCloseTo(119.98);
  });

  it("decreases quantity and removes item when quantity reaches zero", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);

    useCartStore.getState().decreaseQuantity("1");
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    useCartStore.getState().decreaseQuantity("1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("removes a product from the cart completely", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().removeFromCart("1");

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("clears the cart", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});