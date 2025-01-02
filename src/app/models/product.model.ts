export interface Product {
  id: number;
  title: string;
  thumbnail?: string;
  image: string;
  price: number;
  stock?: number;
  quantity?: number;
  rating?: number;
  tags?: string[];
  availabilityStatus?: string;
  brand?: string;
  category?: string;
  description?: string;
  dimensions?: { width: number; height: number; depth: number };
  discountPercentage?: number;
  images?: string[];
  meta?: { createdAt: string; updatedAt: string };
  minimumOrderQuantity?: number;
  returnPolicy?: string;
  reviews?: { rating: number; comment: string; date: string,reviewerName:string,reviewerEmail:string }[];
  shippingInformation?: string;
  sku?: string;
  warrantyInformation?: string;
  weight?: number;
}
