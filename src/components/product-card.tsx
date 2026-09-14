import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { animateFlyToCart } from "@/utils/motion-effects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToCartDto, CartItemRes } from "@/types/carts-interface";
import { cartApi } from "@/services/cart-api";
import { rupiahFormatter } from "@/utils/rupiah-formatter";

enum DiscountTypeEnum {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
  PRICE = "PRICE",
  FREE_ITEM = "FREE_ITEM",
}

interface CardProductProps {
  className?: string;
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

export default function CardProduct({
  className,
  id,
  name,
  imageUrl,
  description,
  rate,
  price,
  discountPrice,
  discountType,
  discountValue,
}: CardProductProps) {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (req: AddToCartDto) => cartApi.addToCart(req),

    onMutate: async (req) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartItemRes[]>(["cart"]);

      queryClient.setQueryData<CartItemRes[]>(["carts"], (old = []) => {
        const updated = [...old];

        const index = updated.findIndex((i) => i.id === req.productId);

        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            qty: updated[index].qty + req.quantity,
          };
        } else {
          updated.push({
            id,
            name,
            imageUrl,
            category: "",
            price,
            discountPrice: discountPrice ?? null,
            qty: req.quantity,
          });
        }

        return updated;
      });

      return { previousCart };
    },

    onError: (_err, _req, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const productImg = e.currentTarget
      .closest(".product-card")
      ?.querySelector("img");
    const cartBtn =
      window.innerWidth < 1024
        ? document.querySelector("#cart-button-mobile")
        : document.querySelector("#cart-button-desktop");

    if (productImg && cartBtn) {
      animateFlyToCart(productImg, cartBtn);
    }

    addToCartMutation.mutate({
      productId: id,
      quantity: 1,
    });
  };

  return (
    <Link
      className={`bg-card p-c-3 rounded-c-5 grid content-between h-full w-c-70 select-none relative overflow-hidden cursor-pointer product-card ${className}`}
      href={`/products/${id}`}
    >
      <div className="absolute top-c-4 left-0 z-10 flex flex-col gap-c-2 max-w-[85%] pointer-events-none">
        {discountPrice && discountType !== DiscountTypeEnum.FREE_ITEM && (
          <div className="bg-red-500 text-white text-c-3 font-bold px-c-3 py-1 rounded-r-full shadow-md">
            <span className="truncate block" suppressHydrationWarning>
              {discountType === DiscountTypeEnum.PERCENTAGE
                ? `${discountValue}% OFF`
                : `${rupiahFormatter.format(discountValue || 0)} OFF`}
            </span>
          </div>
        )}

        {discountType === DiscountTypeEnum.FREE_ITEM && (
          <div className="bg-yellow-500 text-white text-c-3 font-bold px-c-3 py-1 rounded-r-full shadow-md">
            <span className="truncate block">FREE ITEM</span>
          </div>
        )}
      </div>

      <div className="grid place-items-center bg-[#F7F2F7] dark:bg-[#2A202A] rounded-c-5 p-c-5">
        <Image
          src={imageUrl || ""}
          alt="Product"
          width={1000}
          height={1000}
          priority
          className="h-c-61 w-full object-contain"
          loading="eager"
        />
      </div>
      <div className="flex justify-between mt-c-5">
        <p className="text-c-5 font-bold">{name}</p>
        <h4 className="font-semibold text-c-4 mt-c-1">⭐{rate.toFixed(1)}/5</h4>
      </div>
      <p
        className="text-c-4 text-foreground mt-c-3 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </p>
      <div className="mt-c-3 flex justify-between items-center">
        <div className="flex gap-c-2 items-center">
          {discountPrice && (
            <p className="text-c-4-5 text-muted-foreground line-through">
              {rupiahFormatter.format(price)}
            </p>
          )}
          <p className="text-c-5-5 font-bold text-pink-500">
            {rupiahFormatter.format(discountPrice ? discountPrice : price)}
          </p>
        </div>
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
        >
          <ShoppingCart className="size-c-6" />
        </Button>
      </div>
    </Link>
  );
}
