import { defineStore } from 'pinia'

export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    notes: []
  }),

  getters: {
    totalNotes: (state) => state.notes.length,

    notesByCategory: (state) => {
      return (category) => state.notes.filter(n => n.category === category)
    },

    sortedNotes: (state) => {
      return [...state.notes].sort((a, b) => b.priority - a.priority)
    }
  },

  actions: {
    async loadNotes() {
      const stored = localStorage.getItem('notes')
      if (stored) {
        this.notes = JSON.parse(stored)
      }
    },

    addNote(note) {
      const newId = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1
      const newNote = { id: newId, ...note }
      this.notes.push(newNote)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    updateNote(updatedNote) {
      const index = this.notes.findIndex(n => n.id === updatedNote.id)
      if (index !== -1) {

        this.notes[index] = { ...updatedNote }
        localStorage.setItem('notes', JSON.stringify(this.notes))
      }
    }
  }
})