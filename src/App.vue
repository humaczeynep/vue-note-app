<template>
  <header>
    <div class="container">
      <h1>Kişisel Not Uygulaması</h1>
    </div>
  </header>

  <main>
    <router-view></router-view>
  </main>

</template>

<script>
import { useNoteStore } from './stores/note'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const noteStore = useNoteStore()

    noteStore.loadNotes()

    return { noteStore }
  }
}
</script>
