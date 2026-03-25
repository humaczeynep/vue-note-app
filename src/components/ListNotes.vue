<template>

    <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="Ara" />
        <button>
            <i class="material-icons">search</i>
        </button>
    </div>
    <div class="filters mb-3">
        <label>
            Kategori:
            <select v-model="selectedCategory">
                <option value="">Tüm Kategoriler</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
        </label>

        <label>
            Öncelik:
            <select v-model="sortOrder">
                <option value="desc">Yüksek → Düşük</option>
                <option value="asc">Düşük → Yüksek</option>
            </select>
        </label>
    </div>

    <div v-for="note in filteredAndSortedNotes" :key="note.id" class="note-card mb-2 p-2 border">
        <h3 @click="goToDetail(note.id)">{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <span>Kategori: {{ note.category }}</span> |
        <span class="priority-badge" :class="priorityClass(note.priority)">
            {{ note.priority === 1 ? 'Düşük' : note.priority === 2 ? 'Orta' : 'Yüksek' }}
        </span>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '../stores/note.js'


const noteStore = useNoteStore()
noteStore.loadNotes()

const router = useRouter()

const goToDetail = (id) => {
    router.push(`/note/${id}`)
}

const priorityClass = (priority) => {
  if (priority === 3) return 'high'
  if (priority === 2) return 'medium'
  return 'low'
}

const selectedCategory = ref('')
const sortOrder = ref('desc')


const categories = computed(() => {
    const cats = noteStore.notes.map(n => n.category)
    return [...new Set(cats)]
})

const searchQuery = ref('')

const filteredAndSortedNotes = computed(() => {
    let notes = noteStore.notes

    if (selectedCategory.value) {
        notes = notes.filter(n => n.category === selectedCategory.value)
    }

    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        notes = notes.filter(n =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        )
    }
    return notes.sort((a, b) =>
        sortOrder.value === 'asc' ? a.priority - b.priority : b.priority - a.priority
    )
})


</script>

<style scoped>
select {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
}

.filters {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.filters label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    margin: 15px;
}

.note-card {
    background-color: #ffffff;
    border: 1px solid #b9b9b9;
    border-radius: 10px;
    border-radius: 8px;
    padding: 15px;
    margin: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.note-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.search-box {
    padding: 10px;
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
}

.search-box input {
    padding: 0.5rem;
    font-size: 1rem;
}

.search-box button {
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
}

.priority-badge {
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: white;
}

.priority-badge.high {
  background-color: #dc3e4e;
}

.priority-badge.medium {
  background-color: #fd9642;
}

.priority-badge.low {
  background-color: #fcd970;
  color: black;
}
</style>
