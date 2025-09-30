import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    items: [] as string[],
  }),
  actions: {
    addItem(item: string) {
      this.items.push(item)
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
    },
  },
})