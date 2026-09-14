import { WebResponse as WebRes } from "@/types/common-interface";
import { ReviewDto, ReviewRes } from "@/types/review-interface";
import axiosInstance from "@/utils/axios-instance";

export const reviewsApi = {
  addReview: async (request: ReviewDto): Promise<ReviewRes[]> => {
    return await axiosInstance
      .post<WebRes<ReviewRes[]>>("/reviews", request)
      .then((res) => res.data.data ?? []);
  },

  getProductReview: async (id: string): Promise<ReviewRes[]> => {
    return await axiosInstance
      .get<WebRes<ReviewRes[]>>(`/reviews/product/${id}`)
      .then((res) => res.data.data ?? []);
  },
};
