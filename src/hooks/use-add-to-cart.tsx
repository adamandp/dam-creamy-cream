import { cartApi } from "@/services/cart-api";
import { AddToCartDto, CartItemRes } from "@/types/carts-interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProductDetails {
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  discountPrice?: number | null;
}

interface AddToCartPayload {
  item: AddToCartDto;
  details?: ProductDetails;
}

const queryKey = ["carts"];

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item }: AddToCartPayload) => cartApi.addToCart(item),

    onMutate: async ({ item, details }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<CartItemRes[]>(queryKey);

      queryClient.setQueryData<CartItemRes[]>(queryKey, (old = []) => {
        const updated = [...old];

        const index = updated.findIndex((i) => i.id === item.productId);

        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            qty: updated[index].qty + item.quantity,
          };
        } else if (details) {
          updated.push({
            id: item.productId,
            name: details.name,
            imageUrl: details.imageUrl,
            category: details.category,
            price: details.price,
            discountPrice: details.discountPrice ?? null,
            qty: item.quantity,
          });
        }

        return updated;
      });

      return { previousCart };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
