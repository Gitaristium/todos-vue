<template>
    <header>
        <div class="container">
            <div class="wrapper">
                <AppHeaderLogo />
                <nav>
                    <RouterLink class="link" :to="HOME_PATH">Home</RouterLink>
                    <RouterLink class="link" :to="TODOS_PATH">Todos</RouterLink>
                </nav>
            </div>
        </div>
        <div class="test"></div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import AppHeaderLogo from "@/components/AppHeaderLogo.vue";
import { HOME_PATH, TODOS_PATH } from "@/utils/vars";
</script>

<style lang="scss" scoped>
header {
    position: fixed;
    width: 100%;
    background-color: var(--color-background-soft);
    padding: 0.5rem 0;
    z-index: 10;
}
.wrapper {
    display: flex;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
}

nav {
    display: flex;
    gap: 1rem;
}
.link {
    font-size: 1.5rem;
    font-weight: inherit;
    &.router-link-active {
        color: var(--color-text);
        &::after {
            width: 100%;
            background-color: var(--color-text);
        }
    }
}
</style>
