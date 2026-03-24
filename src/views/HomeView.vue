<template>
  <div>
    <div class="top-buttons">
        <button class="btn btn-primary" @click="showForm = true">Yeni Not Oluştur</button>
        <button class="btn btn-secondary" @click="$router.push('/dashboard')">Dashboard Görüntüle</button>
    </div>

    <div class="container">
      <note-card v-if="showForm" @close="showForm = false" />

      <list-notes v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NoteCard from '@/components/NoteCard.vue';
import ListNotes from '../components/ListNotes.vue';

const showForm = ref(false)
</script>