<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oText tag="p" :lineClamp="3">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, quidem atque. Reiciendis vitae necessitatibus
    sequi ad vero, excepturi neque ea voluptatum officiis reprehenderit ducimus pariatur tempore quam? Tempore, delectus
    omnis. Paragraph end. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eligendi velit quod deleniti
    blanditiis atque doloremque! Quibusdam incidunt consectetur, harum, soluta quaerat iure quod, beatae porro deleniti
    exercitationem sint architecto.
  </oText>

  <oText tag="p" :lineClamp="3">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, quidem atque. Reiciendis vitae necessitatibus
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, obcaecati maiores, eius nostrum officia ad explicabo doloremque ipsum et aut, deserunt error inventore! Corporis quia nesciunt vel quos, ad dolor.
  </oText>
  
</template>
