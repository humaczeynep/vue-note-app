<template>
  <div class="note-stats">
    <h2>Not İstatistikleri</h2>

    <div class="stats-card">
      <p><strong>Toplam Not Sayısı:</strong> {{ noteStore.totalNotes }}</p>
    </div>

    <div class="stats-card">
      <h3>Kategori Bazlı Dağılım</h3>
      <ul>
        <li v-for="category in categories" :key="category">
          {{ category }}: {{ noteStore.notesByCategory(category).length }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
noteStore.loadNotes()


const categories = computed(() => {
  const cats = noteStore.notes.map(n => n.category)
  return [...new Set(cats)]
})
</script>

<style scoped>
.note-stats {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.stats-card {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.stats-card h3 {
  margin-bottom: 10px;
}

.stats-card ul {
  list-style: none;
  padding-left: 0;
}

.stats-card li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.stats-card li:last-child {
  border-bottom: none;
}
</style>