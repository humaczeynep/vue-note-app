<template >
    <form @submit.prevent="sendForm">
        <div class="form-group">
            <input v-model="title" type="text" placeholder="Başlık" class="form-control" />
            <textarea v-model="content" placeholder="İçerik" class="form-control"></textarea>

            Kategori:
            <select v-model="category" class="form-select">
                <option>İş</option>
                <option>Kişisel</option>
                <option>Fikir</option>
                <option>Alışveriş</option>
            </select>

            Öncelik:
            <select v-model="priority" class="form-select">
                <option value="1">Düşük</option>
                <option value="2">Orta</option>
                <option value="3">Yüksek</option>
            </select>

            <button class="btn" type="submit">Notu Kaydet</button>
        </div>
    </form>
</template>


<script setup>
import { ref } from 'vue'
import { useNoteStore } from '../stores/note.js'

const emit = defineEmits(['close'])

const noteStore = useNoteStore()

const title = ref('')
const content = ref('')
const category = ref('Kişisel')
const priority = ref(1)

const sendForm = () => {
    if (!title.value || !content.value) return

    noteStore.addNote({
        title: title.value,
        content: content.value,
        category: category.value,
        priority: Number(priority.value)
    })


    title.value = ''
    content.value = ''
    category.value = 'Kişisel'
    priority.value = 1

    emit('close')
}
</script>


<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-control,
.form-select {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
}

textarea.form-control {
    min-height: 80px;
    resize: vertical;
}

button.btn {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

button.btn:hover {
    background-color: #28a745cc;
    color: white;
}


@media (max-width: 600px) {
    .form-group {
        width: 90%;
        padding: 15px;
    }
}
</style>
