import { DiscountTypeEnum } from "./discount-interface";

interface ProductDto {
  id: string;
}

interface ProductRes {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  rate: number;
  category: string;
  sales: number;
  price: number;
  discountPrice?: number | null;
  discountType?: DiscountTypeEnum | null;
  discountValue?: number | null;
}

interface ProductInformationRes {
  information: string;
}

export type { ProductDto, ProductRes, ProductInformationRes };
