/**
 * Merch products. Replace image URLs with real assets in assets/images/merch/ when you have them.
 * Stripe Payment Links: create products in Stripe Dashboard → Payment Links, enable shipping, paste URLs in .env.
 */
export type MerchProduct = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  image: string;
  /** Stripe Payment Link URL (from .env). If empty, "Köp" will show as coming soon. */
  stripePaymentLink: string;
};

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: "tshirt",
    nameKey: "merch.tshirt.name",
    descriptionKey: "merch.tshirt.description",
    priceKey: "merch.tshirt.price",
    image: "https://placehold.co/400x480/2c2c2c/eee?text=Totes+T-shirt",
    stripePaymentLink: import.meta.env.VITE_STRIPE_LINK_TSHIRT ?? "",
  },
  {
    id: "totebag",
    nameKey: "merch.totebag.name",
    descriptionKey: "merch.totebag.description",
    priceKey: "merch.totebag.price",
    image: "https://placehold.co/400x480/2c2c2c/eee?text=Totes+Tote+Bag",
    stripePaymentLink: import.meta.env.VITE_STRIPE_LINK_TOTEBAG ?? "",
  },
];
