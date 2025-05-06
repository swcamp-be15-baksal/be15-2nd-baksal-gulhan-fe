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
    date: Object,
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

function formatDateForSQL(dateStr, isStart) {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const time = isStart ? '00:00:00' : '23:59:59'; // 시작이면 00시, 종료면 23시
    return `${yyyy}-${MM}-${dd} ${time}`;
}

function onStartChange(e) {
    const raw = e.target.value;
    startDate.value = raw;
    emit('update:date', {
        startDate: formatDateForSQL(raw, true), // 시작일이므로 true
        endDate: formatDateForSQL(endDate.value, false),
    });
}

function onEndChange(e) {
    const raw = e.target.value;
    endDate.value = raw;
    emit('update:date', {
        startDate: formatDateForSQL(startDate.value, true),
        endDate: formatDateForSQL(raw, false), // 종료일이므로 false
    });
}

function convertToISOString(localDateStr) {
    const localDate = new Date(localDateStr);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
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
