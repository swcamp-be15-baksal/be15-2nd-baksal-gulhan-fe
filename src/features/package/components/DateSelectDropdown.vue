<template>
    <div class="dropdown-wrapper">
        <button class="date-button" @click="togglePicker">
            {{ displayText }}
        </button>
        <div v-if="showPicker" class="picker-container">
            <label>
                시작일:
                <input type="date" :value="startDate" @change="onStartChange" />
            </label>
            <label>
                종료일:
                <input type="date" :value="endDate" @change="onEndChange" />
            </label>
            <button class="close-btn" @click="hidePicker">닫기</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    date: Object, // { startDate: string, endDate: string }
});

const emit = defineEmits(['update:date']);

const startDate = ref(props.date?.startDate || '');
const endDate = ref(props.date?.endDate || '');
const showPicker = ref(false);

function togglePicker() {
    showPicker.value = !showPicker.value;
}

function hidePicker() {
    showPicker.value = false;
}

function onStartChange(e) {
    startDate.value = e.target.value;
    emit('update:date', { startDate: startDate.value, endDate: endDate.value });
}

function onEndChange(e) {
    endDate.value = e.target.value;
    emit('update:date', { startDate: startDate.value, endDate: endDate.value });
}

const displayText = computed(() => {
    if (startDate.value && endDate.value) {
        return `${startDate.value} ~ ${endDate.value}`;
    } else if (startDate.value) {
        return `${startDate.value} ~`;
    } else if (endDate.value) {
        return `~ ${endDate.value}`;
    } else {
        return '날짜 선택하기';
    }
});
</script>

<style scoped>
.date-button {
    border: none;
    background-color: #fffdf8;
    font-size: 1.4rem;
    font-weight: 400;
    padding: 17px 24px;
    white-space: nowrap;
    border-bottom: 4px solid transparent;
}

.dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.picker-container {
    position: absolute;
    top: 110%;
    left: 0;
    background-color: white;
    border: 1px solid #cac4d0;
    border-radius: 8px;
    padding: 12px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.picker-container input {
    font-size: 1rem;
    padding: 6px;
}

.close-btn {
    background: #eee;
    border: none;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.9rem;
    align-self: flex-end;
}
</style>
