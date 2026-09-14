import { DiscountTypeEnum } from "./discount-interface";

interface CategoriesRecomendationRes {
  id: string;
  imageUrl: string;
  category: string;
  categoryId: string;
}

interface ProductRecomendationRes {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  rate: number;
  price: number;
  discountPrice?: number | null;
  discountType?: DiscountTypeEnum | null;
  discountValue?: number | null;
}

export type { CategoriesRecomendationRes, ProductRecomendationRes };
