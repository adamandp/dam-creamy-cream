"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { productApi } from "@/services/product-api";
import { UUID } from "crypto";
import { reviewsApi } from "@/services/reviews-api";
import { AddToCartDto } from "@/types/carts-interface";

export default function TabsProduct({ slug }: { slug: string }) {
  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hover, setHover] = useState(0);

  const queryClient = useQueryClient();
  const reviewQueryKey = ["product-review", slug];

  const { data: productInformation, isLoading: infoLoading } = useQuery({
    queryKey: ["product-information", slug],
    queryFn: () => productApi.getProductInformation(slug),
  });

  const { data: productReview, isLoading: reviewLoading } = useQuery({
    queryKey: ["product-review", slug],
    queryFn: () => reviewsApi.getProductReview(slug),
  });

  const mutation = useMutation({
    mutationFn: (newReview: {
      productId: UUID;
      rate: number;
      review: string;
    }) => reviewsApi.addReview(newReview),

    // Optimistic Update
    onMutate: async (newReview) => {
      await queryClient.cancelQueries({ queryKey: reviewQueryKey });
      const previousReviews = queryClient.getQueryData(reviewQueryKey);

      // We manually add a temporary review to the UI
      queryClient.setQueryData(reviewQueryKey, (old: AddToCartDto[]) => [
        {
          id: "temp-id",
          name: "You",
          rate: newReview.rate,
          review: newReview.review,
          imageUrl: "",
          createdAt: new Date().toISOString(),
        },
        ...(old || []),
      ]);

      return { previousReviews };
    },

    onError: (err, newReview, context) => {
      queryClient.setQueryData(reviewQueryKey, context?.previousReviews);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: reviewQueryKey });
      setRate(0);
      setComment("");
    },
  });

  const handleSubmitReview = () => {
    if (rate === 0 || !comment.trim()) return;

    mutation.mutate({
      productId: slug as string as UUID,
      rate: rate,
      review: comment,
    });
  };

  return (
    <Tabs defaultValue="additionalInformation" className="py-c-10">
      <TabsList className="bg-transparent border-b border-white/10 rounded-none w-full justify-start gap-c-4">
        <TabsTrigger
          value="additionalInformation"
          className="data-[state=active]:border-primary border-b-2 rounded-none bg-transparent px-c-4 pb-c-2 transition-all"
        >
          Additional Information
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="data-[state=active]:border-primary border-b-2 rounded-none bg-transparent px-c-4 pb-c-2 transition-all"
        >
          Reviews ({productReview?.length || 0})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="additionalInformation" className="mt-c-6">
        {infoLoading ? (
          <div className="animate-pulse space-y-c-2">
            <div className="h-c-4 bg-muted rounded w-3/4"></div>
            <div className="h-c-4 bg-muted rounded w-1/2"></div>
          </div>
        ) : (
          <ScrollArea
            type="always"
            className="h-c-120 w-full rounded-c-4 border bg-secondary/5 p-c-4"
          >
            <div className="text-c-5 leading-relaxed whitespace-pre-line text-muted-foreground pr-c-4">
              {productInformation?.information ||
                "No additional information available."}
            </div>
          </ScrollArea>
        )}
      </TabsContent>

      <TabsContent value="reviews" className="mt-c-6 space-y-c-8">
        <div className="p-c-6 rounded-c-5 border border-white/10 bg-white/5 backdrop-blur-sm">
          <h3 className="text-c-6 font-semibold mb-c-4 text-white">
            Leave a Review
          </h3>

          <div className="flex items-center gap-c-2 mb-c-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={mutation.isPending}
                onClick={() => setRate(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110 focus:outline-none disabled:opacity-50"
              >
                <Star
                  size={24}
                  className={cn(
                    "transition-colors",
                    (hover || rate) >= star
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/40",
                  )}
                />
              </button>
            ))}
            <span className="ml-c-2 text-c-4 text-muted-foreground">
              {rate > 0 ? `${rate} stars` : "Select rating"}
            </span>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={mutation.isPending}
            placeholder="Share your experience with this treat..."
            className="bg-black/20 border-white/10 focus:border-primary/50 min-h-25 rounded-c-4 text-c-5 resize-none mb-c-4"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSubmitReview}
              disabled={mutation.isPending || rate === 0 || !comment.trim()}
              className="rounded-full px-c-8 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(219,39,119,0.4)]"
            >
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Post Review
            </Button>
          </div>
        </div>

        <ScrollArea className="pr-c-4 h-c-120">
          <div className="space-y-c-4">
            {reviewLoading && (
              <p className="text-center py-c-10">Loading reviews...</p>
            )}
            {!reviewLoading && productReview?.length === 0 && (
              <div className="text-center py-c-10 border border-dashed border-white/10 rounded-c-5">
                <p className="text-muted-foreground">
                  Be the first to review this product!
                </p>
              </div>
            )}

            {productReview?.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-start gap-c-4 p-c-4 bg-white/5 rounded-c-5 border border-white/5 transition hover:bg-white/8"
              >
                {/* --- BAGIAN YANG DIUBAH: Pengecekan Image URL --- */}
                {item.imageUrl ? (
                  <Image
                    width={48}
                    height={48}
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-c-12 h-c-12 rounded-full object-cover border-2 border-primary/20 shrink-0"
                  />
                ) : (
                  <div className="w-c-12 h-c-12 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-primary/20 shrink-0">
                    <UserCircle2
                      className="w-c-8 h-c-8 text-muted-foreground/60"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-c-1">
                    <h4 className="text-c-6 font-semibold text-white">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-c-1 text-primary">
                      {"★".repeat(item.rate || 0)}
                      <span className="text-muted-foreground/60 text-c-4 ml-c-1">
                        {item?.rate}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-c-5 text-muted-foreground/90 leading-relaxed italic">
                    {item.comment}
                  </p>
                  <p className="text-c-3 uppercase tracking-wider text-muted-foreground/40 mt-c-2 font-medium">
                    {item.createdAt
                      ? new Intl.DateTimeFormat("en-US").format(
                          new Date(item.createdAt),
                        )
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
