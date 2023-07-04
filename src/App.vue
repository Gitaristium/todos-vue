<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
    store.dispatch("ADD_TODOS");
});
</script>

<style lang="scss" scoped>
main {
    padding-top: var(--padding-top);
}
</style>
