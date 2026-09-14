"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { categoriesApi } from "@/services/categories-api";
import { CategoriesRes } from "@/types/categories-interface";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function CategoriesOption() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCatParams = searchParams.get("cat");
  const selectedCategories = currentCatParams
    ? currentCatParams.split(",")
    : [];

  const handleToggleCategory = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCatParams === id) {
      params.delete("cat");
    } else {
      params.set("cat", id);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useQuery<CategoriesRes[]>({
    queryKey: ["categories-shop"],
    queryFn: categoriesApi.getCategories,
  });

  return (
    <div className="grid gap-c-6">
      <h2 className="font-berkshire-swash text-c-8">Categories</h2>
      <div className="grid gap-c-4">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-c-4">
              <div className="size-c-6 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
              <div className="h-c-4 w-c-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          ))}

        {isError && (
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="size-c-4" />
              <p className="text-sm font-medium">Failed to load categories</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="text-xs flex gap-1 items-center"
            >
              <RefreshCcw className="size-3" /> Try Again
            </Button>
          </div>
        )}

        {!isLoading &&
          !isError &&
          categories?.map(({ id, name }) => (
            <div key={id} className="flex items-center gap-c-4">
              <Checkbox
                className="rounded-full size-c-6"
                id={id}
                checked={selectedCategories.includes(id)}
                onCheckedChange={() => handleToggleCategory(id)}
              />
              <label className="text-c-6 cursor-pointer" htmlFor={id}>
                {name}
              </label>
            </div>
          ))}

        {!isLoading && !isError && categories?.length === 0 && (
          <p className="text-c-6 text-muted-foreground">No categories found.</p>
        )}
      </div>
    </div>
  );
}
