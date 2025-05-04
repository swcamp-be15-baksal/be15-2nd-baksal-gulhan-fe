<script setup>
import { ref } from 'vue';

const keyword = ref('');
const props = defineProps({
    placeholder: {
        type: String,
        default: '검색어를 입력하세요',
    },
});
const emit = defineEmits(['search']);

function handleSearch() {
    emit('search', keyword.value);
}
</script>

<template>
    <div class="search-bar">
        <input
            v-model="keyword"
            type="text"
            :placeholder="props.placeholder"
            @keyup.enter="handleSearch" />
        <button @click="handleSearch">
            <img src="../../assets/icons/search.svg" alt="검색" style="width: 18px; height: 18px" />
        </button>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 9999px;
}

.search-bar input {
    border: none;
    font-size: 0.9rem;
    font-weight: 400;
    color: black;
}

.search-bar input::placeholder {
    color: #757575;
}

.search-bar input:focus {
    outline: none;
}

.search-bar button {
    border: none;
    background-color: white;
}
</style>
