"use client";

import { useQuery } from "@tanstack/react-query";
import Carousel from "../carousel/carousel";
import CardProduct from "../product-card";
import CardProductSkeleton from "../product-card-skeleton";
import { getRecomendations } from "@/services/recomendations-api";

export default function RelatedProduct({ id }: { id: string }) {
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: ["related-recomendations", id],
    queryFn: () => getRecomendations.related(id),
  });

  return (
    <div className="grid gap-c-10 place-items-center overflow-hidden ">
      <section className="grid gap-c-5 text-center">
        <h1 className="title-text">
          Related <span>Products</span>
        </h1>
        <h2 className="desc-text">
          Explore similar products that match your interests and preferences.
        </h2>
      </section>
      <section className="grid place-items-center">
        {isLoading ? (
          <Carousel
            options={{ loop: true }}
            size={280}
            spacing={20}
            visibleSlides={5}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <article className="mx-2 lg:mx-auto" key={index}>
                <CardProductSkeleton />
              </article>
            ))}
          </Carousel>
        ) : (
          <Carousel
            options={{ loop: true }}
            size={280}
            spacing={20}
            visibleSlides={relatedProducts?.length}
          >
            {relatedProducts?.map((item) => (
              <article className="mx-2 lg:mx-auto" key={item.id}>
                <CardProduct {...item} />
              </article>
            ))}
          </Carousel>
        )}
      </section>
    </div>
  );
}
