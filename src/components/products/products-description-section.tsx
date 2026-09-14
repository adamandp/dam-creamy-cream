"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { ArrowRight, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { rupiahFormatter } from "@/utils/rupiah-formatter";
import { animateFlyToCart } from "@/utils/motion-effects";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { productApi } from "@/services/product-api";
import ProductsDescriptionSkeleton from "./products-description-skeleton";

export default function ProductDescriptionSection({ slug }: { slug: string }) {
  const [qty, setQty] = useState<number>(1);
  const { mutate, isPending } = useAddToCart();

  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productApi.getProduct(slug),
  });

  if (isLoading || !data) {
    return <ProductsDescriptionSkeleton />;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const productImg = e.currentTarget
      .closest(".product-image")
      ?.querySelector("img");
    const cartBtn =
      window.innerWidth < 1024
        ? document.querySelector("#cart-button-mobile")
        : document.querySelector("#cart-button-desktop");

    if (productImg && cartBtn) {
      animateFlyToCart(productImg, cartBtn);
    }

    mutate({
      item: { productId: data.id, quantity: qty },
      details: {
        name: data.name,
        imageUrl: data.imageUrl,
        category: data.category,
        price: data.price,
        discountPrice: data.discountPrice,
      },
    });
  };

  return (
    <Link
      className="flex flex-col gap-c-8 md:flex-row md:gap-c-10 product-image"
      href={`/products/${slug}`}
    >
      <div className="w-full md:w-1/2 bg-[#F7F2F7] dark:bg-[#2A202A] rounded-c-5 p-c-6 grid place-items-center">
        <Image
          src={data?.imageUrl || ""}
          alt="Product"
          width={1000}
          height={1000}
          className="w-full max-h-c-80 object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out"
        />
      </div>
      <div className="flex-1 flex flex-col gap-c-6">
        <div className="flex flex-col gap-c-3">
          <h1 className="text-c-7-5 font-bold">{data?.name}</h1>
          <div className="flex items-center gap-c-5 divide-x-2 text-c-5">
            <p className="pr-c-8">
              {"⭐".repeat(data?.rate || 0)} ({data?.rate.toFixed(1)}/5)
            </p>
            <p className="font-medium pr-c-8">{data?.category}</p>
            <div className="font-medium">
              {data?.sales}{" "}
              <span className="text-muted-foreground font-normal">
                units sold
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-c-3 items-center border-y border-border py-c-4">
          {data?.discountPrice && (
            <span className="text-c-6 line-through text-muted-foreground">
              {rupiahFormatter.format(data?.price)}
            </span>
          )}
          <span className="text-c-7-5 font-bold text-pink-500">
            {rupiahFormatter.format(
              data.discountPrice ? data.discountPrice : data.price,
            )}
          </span>
        </div>
        <p className="text-c-5 text-muted-foreground">{data?.description}</p>
        <div className="flex items-center gap-c-4 ">
          <div className="flex items-center gap-c-3">
            {/* 2. PERBAIKAN DI SINI: Tambah e.preventDefault() & stopPropagation() */}
            <Button
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQty(qty - 1);
              }}
              disabled={qty === 1}
            >
              <MinusIcon className="size-c-5 stroke-3" />
            </Button>
            <span className="text-c-5">{qty}</span>
            <Button
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQty(qty + 1);
              }}
              disabled={qty === 99}
            >
              <PlusIcon className="size-c-5 stroke-3" />
            </Button>
            {/* ------------------------------------------------------------- */}
          </div>
          <Button onClick={handleAddToCart} disabled={isPending}>
            Add to cart <ArrowRight className="size-c-6" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
