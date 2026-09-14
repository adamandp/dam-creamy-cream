"use client";

import { useQuery } from "@tanstack/react-query";
import Carousel from "../carousel/carousel";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CategoriesRecomendationRes } from "@/types/recomendations-interface";
import { getRecomendations } from "@/services/recomendations-api";
import { useRouter } from "next/navigation";

function CategoryCardSkeleton() {
  return (
    <div className="mx-c-3 lg:mx-c-5 animate-pulse">
      <div className="relative w-c-70 h-c-100 bg-pink-50 dark:bg-[#2A202A]/50 border-3 border-dashed border-pink-200 dark:border-pink-900 rounded-c-8 overflow-hidden">
        <div className="relative w-full h-full p-c-2 bg-card/50 dark:bg-[#1F1A24] flex items-center justify-center">
          <div className="w-full h-full bg-muted/40 rounded-c-8" />
        </div>

        <div className="px-c-5 py-c-2 flex justify-between items-center gap-2 absolute bottom-[5%] bg-pink-100/80 dark:bg-[#3A2C3F]/80 border-2 border-pink-200 dark:border-pink-800 rounded-full w-[90%] left-1/2 transform -translate-x-1/2">
          <div className="h-c-8 w-c-30 bg-pink-300/50 dark:bg-pink-900/50 rounded-md" />

          <div className="bg-pink-400/50 dark:bg-pink-800/50 rounded-full w-c-8 h-c-8 shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function Categories() {
  const router = useRouter();

  const { data: categories, isLoading } = useQuery<
    CategoriesRecomendationRes[]
  >({
    queryKey: ["categories-recomendations"],
    queryFn: getRecomendations.categories,
  });

  return (
    <div className="grid gap-c-10 place-items-center pb-c-24 overflow-hidden">
      <section className="grid gap-c-5 text-center lg:text-start">
        <h1 className="title-text text-center">
          Explore Our <span>Categories</span>
        </h1>
        <h2 className="desc-text text-center">
          Browse through our different categories to find your favorite ice
          cream treats.
        </h2>
      </section>
      <section className="grid place-items-center">
        {isLoading ? (
          <Carousel
            options={{ loop: true }}
            size={280}
            spacing={20}
            visibleSlides={6}
            paddingSlide="py-c-20"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </Carousel>
        ) : (
          <Carousel
            options={{ loop: true }}
            size={280}
            spacing={20}
            visibleSlides={categories?.length}
            paddingSlide="py-c-20"
          >
            {categories?.map((item) => (
              <div key={item.id} className="mx-c-3 lg:mx-c-5">
                <motion.div
                  onClick={() => router.push(`/shop?cat=${item.categoryId}`)}
                  className="relative w-c-70 h-c-100 bg-pink-100 dark:bg-[#2A202A] border-3 border-dashed border-pink-600 dark:border-pink-300 rounded-c-8 shadow-xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-full h-full p-c-10 bg-card dark:bg-[#1F1A24]">
                    <Image
                      src={item.imageUrl}
                      width={1000}
                      height={1000}
                      alt={item.category}
                      className="object-contain w-full h-full drop-shadow-lg"
                    />
                  </div>

                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="px-c-5 py-c-2 flex justify-between items-center gap-2 absolute bottom-[5%] bg-pink-200 dark:bg-[#3A2C3F] border-2 border-pink-400 dark:border-pink-200 rounded-full w-[90%] left-1/2 transform -translate-x-1/2 hover:bg-pink-300 dark:hover:bg-[#503553]"
                  >
                    <h3 className="text-c-8 font-bold text-pink-700 dark:text-pink-100 truncate">
                      {item.category}
                    </h3>
                    <div className="bg-pink-500 dark:bg-pink-400 rounded-full grid place-items-center p-c-3 text-white">
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </Carousel>
        )}
      </section>
    </div>
  );
}
