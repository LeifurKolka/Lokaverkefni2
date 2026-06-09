import { describe, expect, it } from "vitest";
import { createFakeOrder } from "./checkout";
import type { CartItem } from "../types/cart";
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

const mockItems: CartItem[] = [
  {
    product: mockProduct,
    quantity: 2,
  },
];

describe("createFakeOrder", () => {
  it("creates an order when form data and cart are valid", () => {
    const result = createFakeOrder(
      {
        fullName: "Leifur",
        email: "test@example.com",
      },
      mockItems,
      119.98
    );

    expect(result).not.toBeNull();
    expect(result?.fullName).toBe("Leifur");
    expect(result?.email).toBe("test@example.com");
    expect(result?.total).toBeCloseTo(119.98);
    expect(result?.orderNumber.startsWith("ORD-")).toBe(true);
  });

  it("returns null when full name is empty", () => {
    const result = createFakeOrder(
      {
        fullName: "",
        email: "test@example.com",
      },
      mockItems,
      119.98
    );

    expect(result).toBeNull();
  });

  it("returns null when email is empty", () => {
    const result = createFakeOrder(
      {
        fullName: "Leifur",
        email: "",
      },
      mockItems,
      119.98
    );

    expect(result).toBeNull();
  });

  it("returns null when cart is empty", () => {
    const result = createFakeOrder(
      {
        fullName: "Leifur",
        email: "test@example.com",
      },
      [],
      0
    );

    expect(result).toBeNull();
  });
});