import { defineStore } from "pinia";
import api from "../services/api";

export const useLearningStore = defineStore("learning", {
  state: () => ({
    learnings: []
  }),

  actions: {
    async fetchLearnings() {
      const res = await api.get("/learning");
      this.learnings = res.data;
    },

    async addLearning(data) {
      await api.post("/learning", data);
      await this.fetchLearnings();
    },

    async updateLearning(id, data) {
      await api.put(`/learning/${id}`, data);
      await this.fetchLearnings();
    },

    async deleteLearning(id) {
      await api.delete(`/learning/${id}`);
      await this.fetchLearnings();
    },

    async getById(id) {
      if (this.learnings.length === 0) {
        await this.fetchLearnings();
      }
      return this.learnings.find(l => l.id === id);
    }
  }
});
