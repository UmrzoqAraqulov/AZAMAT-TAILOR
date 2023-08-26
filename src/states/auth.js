import Cookies from "js-cookie";
import { create } from "zustand";
import { TOKEN, USER } from "../const";
import { request } from "../server/request";

export const useAuth = create((set) => ({
  isAuthenticated: Cookies.get(TOKEN) || "",
  user: Cookies.get(USER) || "",
  loading: false,
  login: async (userInfo, navigate) => {
    try {
      set({ loading: true });
      const { data, statusText } = await request.post("auth/login", userInfo);
      const { token, userName } = data;
      if (statusText === "OK") {
        set({ isAuthenticated: token });
        set({ user: userName });
        Cookies.set(TOKEN, token);
        Cookies.set(USER, userName);
        request.defaults.headers.Authorization = `Bearer ${token}`;
        if (userName === "admin") navigate("/admin");
        else navigate("/tailor");
      }
    }catch(err){
      console.log(err.message);
    } finally {
      set({ loading: false });
    }
  },
}));
