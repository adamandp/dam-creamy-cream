import {
  CategoriesRecomendationRes as CategoriesRes,
  ProductRecomendationRes,
} from "@/types/recomendations-interface";
import { WebResponse as WebRes } from "@/types/common-interface";
import axiosInstance from "@/utils/axios-instance";

export const getRecomendations = {
  categories: async (): Promise<CategoriesRes[]> => {
    return await axiosInstance
      .get<WebRes<CategoriesRes[]>>("/recommendations/categories")
      .then((res) => res.data.data ?? []);
  },
  classic: async (): Promise<ProductRecomendationRes[]> => {
    return await axiosInstance
      .get<WebRes<ProductRecomendationRes[]>>("/recommendations/classic")
      .then((res) => res.data.data ?? []);
  },
  offers: async (): Promise<ProductRecomendationRes[]> => {
    return await axiosInstance
      .get<WebRes<ProductRecomendationRes[]>>("/recommendations/offers")
      .then((res) => res.data.data ?? []);
  },
  related: async (id: string): Promise<ProductRecomendationRes[]> => {
    return await axiosInstance
      .get<WebRes<ProductRecomendationRes[]>>(`/recommendations/related/${id}`)
      .then((res) => res.data.data ?? []);
  },
};
