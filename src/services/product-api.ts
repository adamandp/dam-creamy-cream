import { WebResponse as WebRes } from "@/types/common-interface";
import { ProductInformationRes, ProductRes } from "@/types/product-interface";
import axiosInstance from "@/utils/axios-instance";

export const productApi = {
  getProduct: async (id: string): Promise<ProductRes | null> => {
    return await axiosInstance
      .get<WebRes<ProductRes>>(`/product/${id}`)
      .then((res) => res.data?.data ?? null);
  },

  getProductInformation: async (id: string): Promise<ProductInformationRes> => {
    return await axiosInstance
      .get<WebRes<ProductInformationRes>>(`/product/information/${id}`)
      .then(
        (res) => res.data.data ?? { information: "No information available." },
      );
  },
};
