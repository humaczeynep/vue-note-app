<template>
  <div class="note-detail" v-if="note">
    <div v-if="!isEditing" class="view-mode">
      <h1>{{ note.title }}</h1>
      <p>{{ note.content }}</p>
      <p><strong>Kategori:</strong> {{ note.category }}</p>
      <p><strong>Öncelik:</strong> {{ priorityText }}</p>

      <div class="action-buttons">
        <button @click="goBack">Geri</button>
        <i class="material-icons" @click="isEditing = true">edit</i>
        <i class="material-icons" @click="deleteAndGoBack">delete</i>
      </div>
    </div>

    <div v-else class="edit-form">
      <div class="form-group">
        <label>Başlık</label>
        <input v-model="editTitle" placeholder="Başlık" class="form-control" />

        <label>İçerik</label>
        <textarea v-model="editContent" placeholder="İçerik" class="form-control"></textarea>

        <label>Kategori</label>
        <select v-model="editCategory" class="form-select">
          <option>İş</option>
          <option>Kişisel</option>
          <option>Fikir</option>
          <option>Alışveriş</option>
        </select>

        <label>Öncelik</label>
        <select v-model="editPriority" class="form-select">
          <option :value="1">Düşük</option>
          <option :value="2">Orta</option>
          <option :value="3">Yüksek</option>
        </select>
      </div>

      <div class="form-buttons">
        <button class="btn btn-save" @click="saveEdit">Kaydet</button>
        <button class="btn btn-cancel" @click="cancelEdit">İptal</button>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Not bulunamadı...</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '../stores/note.js'

const noteStore = useNoteStore()
const route = useRoute()
const router = useRouter()

noteStore.loadNotes()

const noteId = Number(route.params.id)
const note = computed(() => noteStore.notes.find(n => n.id === noteId))

const isEditing = ref(false)
const editTitle = ref('')
const editContent = ref('')
const editCategory = ref('Kişisel')
const editPriority = ref(1)

const priorityText = computed(() => {
  if (!note.value) return ''
  return note.value.priority === 1 ? 'Düşük' : note.value.priority === 2 ? 'Orta' : 'Yüksek'
})

watch(isEditing, (val) => {
  if (val && note.value) {
    editTitle.value = note.value.title
    editContent.value = note.value.content
    editCategory.value = note.value.category
    editPriority.value = note.value.priority
  }
})

const saveEdit = () => {
  noteStore.updateNote({
    id: note.value.id,
    title: editTitle.value,
    content: editContent.value,
    category: editCategory.value,
    priority: Number(editPriority.value)
  })
  isEditing.value = false
  router.push('/')
}

const cancelEdit = () => {
  isEditing.value = false
}

const deleteAndGoBack = () => {
  noteStore.deleteNote(noteId)
  router.push('/')
}

const goBack = () => router.push('/')
</script>


<style scoped>

.note-detail {
  max-width: 600px;
  margin: 50px auto;
  padding: 25px 20px;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}
.note-detail h1 {
  margin-bottom: 15px;
}
.note-detail p {
  margin-bottom: 10px;
}
.action-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}
.action-buttons button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action-buttons button:hover {
  background-color: #218838;
}
.action-buttons .material-icons {
  cursor: pointer;
  font-size: 24px;
  color: #555;
  transition: color 0.2s ease;
}
.action-buttons .material-icons:hover {
  color: #000;
}

.edit-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.edit-form label {
  font-weight: bold;
  color: #333;
}
.edit-form .form-control,
.edit-form .form-select {
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}
.edit-form textarea.form-control {
  min-height: 100px;
  resize: vertical;
}
.edit-form .form-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.edit-form .btn-save {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.edit-form .btn-save:hover {
  background-color: #218838;
}
.edit-form .btn-cancel {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.edit-form .btn-cancel:hover {
  background-color: #5a6268;
}

@media (max-width: 600px) {
  .edit-form .form-buttons {
    flex-direction: column;
  }
}
</style>
