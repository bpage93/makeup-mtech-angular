// Interface for the nested color object
export interface ProductColor {
  hex_value: string;
  colour_name: string;
}

// Main interface for the entire makeup product object
export interface MakeupProduct {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign: string | null;
  currency: string | null;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating: number | null;
  category: string | null;
  product_type: string;
  tag_list: string[];
  created_at: string; // Or Date if you plan to convert it
  updated_at: string; // Or Date
  product_api_url: string;
  api_featured_image: string;
  product_colors: ProductColor[];
}
