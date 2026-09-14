import CategoriesOption from "@/components/shop/categories-option";
import { MobileDrawer } from "@/components/shop/mobile-drawer";
import PriceFilter from "@/components/shop/price-filter";
import ProductCatalog from "@/components/shop/product-catalog";
import ShopSearchbar from "@/components/shop/shop-search-bar";
import { SelectSorting } from "@/components/shop/shop-sorting";
import { categoriesApi } from "@/services/categories-api";
import { productsApi } from "@/services/products-api";
import { CatalogDto } from "@/types/products-interface";
import { getQueryClient } from "@/utils/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ["categories-shop"],
    queryFn: categoriesApi.getCategories,
  });

  const filters = {
    q: params.q || undefined,
    sort: (params.sort as CatalogDto["sort"]) || undefined,
    min: params.min ? Number(params.min) : undefined,
    max: params.max ? Number(params.max) : undefined,
    cat: params.cat ? params.cat.split(",") : undefined,
    page: params.page ? Number(params.page) : undefined,
    limit: params.limit ? Number(params.limit) : undefined,
  };

  await queryClient.prefetchQuery({
    queryKey: ["catalog", filters],
    queryFn: () => productsApi.getCatalog(filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="content-container py-c-10 w-full">
        <header className="flex items-center justify-between gap-c-5 h-c-15">
          <ShopSearchbar />
          <SelectSorting />
          <MobileDrawer />
        </header>
        <div className="pt-c-10 flex justify-between gap-c-5">
          <section className="hidden lg:grid gap-c-10 h-fit w-fit min-w-c-60">
            <CategoriesOption />
            <PriceFilter />
          </section>
          <section className="w-full flex h-fit ">
            <ProductCatalog />
          </section>
        </div>
      </main>
    </HydrationBoundary>
  );
}
