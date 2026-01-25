import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:5000/api/learning";

export const useLearningStore = defineStore("learning", {
  state: () => ({
    learnings: [],
    loading: false
  }),

  actions: {
    // GET ALL
    async fetchLearnings() {
      this.loading = true;
      try {
        const res = await axios.get(API_URL);
        this.learnings = res.data;
      } finally {
        this.loading = false;
      }
    },

    // GET BY ID
    async getById(id) {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    },

    // ADD
    async addLearning(data) {
      await axios.post(API_URL, data);
      await this.fetchLearnings();
    },

    // UPDATE
    async updateLearning(id, data) {
      await axios.put(`${API_URL}/${id}`, data);
      await this.fetchLearnings();
    },

    // DELETE
    async deleteLearning(id) {
      await axios.delete(`${API_URL}/${id}`);
      await this.fetchLearnings();
    }
  }
});
