import {
  AddToCartDto,
  CartItemRes,
  RemoveFromCartDto,
} from "@/types/carts-interface";
import { WebResponse as WebRes } from "@/types/common-interface";
import axiosInstance from "@/utils/axios-instance";

export const cartApi = {
  getCart: async (): Promise<CartItemRes[]> => {
    return await axiosInstance
      .get<WebRes<CartItemRes[]>>("/carts/user")
      .then((res) => res.data.data ?? []);
  },

  addToCart: async (request: AddToCartDto): Promise<AddToCartDto | null> => {
    return await axiosInstance
      .post<WebRes<AddToCartDto>>("/carts/user/add", request)
      .then((res) => res.data.data ?? null);
  },

  removeFromCart: async (
    request: RemoveFromCartDto,
  ): Promise<RemoveFromCartDto | null> => {
    return await axiosInstance
      .post<WebRes<RemoveFromCartDto>>("/carts/user/remove", request)
      .then((res) => res.data.data ?? null);
  },
};
