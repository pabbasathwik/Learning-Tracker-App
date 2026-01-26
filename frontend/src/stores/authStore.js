import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),

  actions: {
    async register(data) {
      await api.post("/auth/register", data);
    },

    async login(data) {
      const res = await api.post("/auth/login", data);

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
      api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.clear();
      delete api.defaults.headers.common.Authorization;
    }
  }
});
