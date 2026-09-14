import { WebResponse as WebRes } from "@/types/common-interface";
import { CatalogDto, CatalogRes } from "@/types/products-interface";
import axiosInstance from "@/utils/axios-instance";

export const productsApi = {
  getCatalog: async (query: CatalogDto): Promise<CatalogRes[]> => {
    return await axiosInstance
      .get<WebRes<CatalogRes[]>>("/products/catalog", {
        params: {
          q: query.q,
          sort: query.sort,
          min: query.min,
          max: query.max,
          cat: query.cat?.length ? query.cat.join(",") : undefined,
          page: query.page,
          limit: query.limit,
        },
      })
      .then((res) => res.data.data ?? []);
  },
};
