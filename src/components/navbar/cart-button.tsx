"use client";

import { hoverEffect, tapEffect } from "@/utils/motion-effects";
import { motion } from "motion/react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CartItemRes } from "@/types/carts-interface";
import { cartApi } from "@/services/cart-api";

export default function CartButton() {
  const { data: carts, isPending } = useQuery<CartItemRes[]>({
    queryKey: ["carts"],
    queryFn: cartApi.getCart,
  });

  return (
    <motion.div
      className="relative"
      whileHover={{ ...hoverEffect() }}
      whileTap={{ ...tapEffect() }}
    >
      <ShoppingCart className="size-c-7 md:size-c-9 lg:size-c-5 cursor-pointer hover:text-pink-500 active:text-pink-600" />
      <span className="absolute -top-c-3 -right-c-3 lg:-top-c-3 lg:left-c-3 bg-pink-500 text-c-3 size-c-6 rounded-full grid place-items-center text-white">
        {isPending ? (
          <Loader2 className="w-3/4 h-3/4 animate-spin" />
        ) : (
          carts?.map((item) => item.qty).reduce((a, b) => a + b, 0) || 0
        )}
      </span>
    </motion.div>
  );
}
