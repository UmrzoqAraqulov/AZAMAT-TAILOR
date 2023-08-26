import { create } from "zustand";
import { request } from "../server/request";
import { toast } from "react-toastify";

export const useOrders = create((set) => ({
  ordersData: [],
  loading: false,
  loadingBtn: false,
  total: 0,
  getOrders: async ({ page, search, pageLimit }) => {
    try {
      set({ loading: true });
      const { data } = await request.post(`orders/in_process`, {
        pageNumber: page,
        pageSize: pageLimit,
        searchText: search,
      });
      const { totalCount, items } = data.page;
      set({ total: totalCount, ordersData: items });
    } finally {
      set({ loading: false });
    }
  },
  postOrder: async (order) => {
    console.log(order);
    try {
      set({ loadingBtn: true });
      await request.post("orders", order);
      toast.success("Buyurtma qo'shildi");
    } catch {
      toast.error("Buyurtma qo'shilmadi,Qayta urinib ko'ring");
    } finally {
      set({ loadingBtn: false });
    }
  },
  putOrder: async ({values,id}) => {
    console.log({values,id});
    try {
      set({ loadingBtn: true });
      await request.put(`orders/${id}`, values);
      toast.success("Buyurtma uzgartirildi");
    } catch {
      toast.error("Buyurtma uzgartirilmadi,Qayta urinib ko'ring");
    } finally {
      set({ loadingBtn: false });
    }
  },
}));
