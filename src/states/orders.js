import { create } from "zustand";
import { request } from "../server/request";

export const useOrders = create((set) => ({
  ordersData: [],
  loading: false,
  total: 0,
  getOrders: async ({ page, search, pageLimit }) => {
    try {
      set({ loading: true });
      const { data } = await request.post(`orders/in_process`, {
        pageNumber: page,
        pageSize: pageLimit,
        searchText:search,
      });
      const { totalCount, items } = data.page;
      set({ total: totalCount, ordersData: items });
    } finally {
      set({ loading: false });
    }
  },
}));
