import { defineStore } from "pinia";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),

  actions: {
    async register(data) {
      await axios.post(`${API}/register`, data);
    },

    async login(data) {
      const res = await axios.post(`${API}/login`, data);
      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.token}`;
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }
});
