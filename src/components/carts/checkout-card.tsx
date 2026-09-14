"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { rupiahFormatter } from "@/utils/rupiah-formatter";

export default function CheckoutCard() {
  const checkoutItems = useAppSelector(
    (state: RootState) => state.checkoutSlice.items,
  );

  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const totalDiscount = checkoutItems.reduce(
    (acc, item) =>
      acc + (item.price - (item.discountPrice ?? item.price)) * item.qty,
    0,
  );

  const grandTotal = subtotal - totalDiscount;

  return (
    <div className="rounded-c-5 flex flex-col h-fit bg-card border-t-2 border-pink-500">
      <p className="text-c-6 font-bold text-center py-c-5">Order Summary</p>
      <div className="flex items-center justify-center gap-c-5 border-y-2 py-c-5">
        <Input
          className="w-[60%]! rounded-full h-fit text-c-5!"
          placeholder="Apply Coupon Code"
        />
        <Button className="py-c-1! px-c-4!">Apply</Button>
      </div>
      <div className="p-c-8">
        <div className="border-b-2">
          <p className="text-c-5 font-semibold mb-c-5">Product Details :</p>
          <div className="grid gap-c-2 pb-c-4">
            <div className="flex justify-between items-center">
              <p className="text-c-4-5 text-muted-foreground">Subtotal</p>
              <p className="text-c-4-5 font-semibold">
                {rupiahFormatter.format(subtotal)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-c-4-5 text-muted-foreground">Discount</p>
              <p className="text-c-4-5 font-semibold text-red-500">
                {rupiahFormatter.format(totalDiscount)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-c-6 pb-c-4">
          <p className="text-c-4-5 font-bold">Grand Total</p>
          <p className="text-c-4-5 font-semibold text-green-500">
            {rupiahFormatter.format(grandTotal)}
          </p>
        </div>
        <div className="pb-c-6 border-b-2">
          <Link href="/checkout">
            <Button className="w-full" disabled={checkoutItems.length === 0}>
              Proceed to Checkout <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-c-2">
          <ShieldCheck className="size-c-7" />
          <p className="text-c-4 text-muted-foreground pt-c-4">
            Safe and Secure Payments, Easy Returns. 100% Authentic Products
          </p>
        </div>
      </div>
    </div>
  );
}
