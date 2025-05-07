<template>
    <div class="editor-page">
        <header class="header">기념품 등록</header>
        <!-- 제목 입력창 -->
        <div class="input-info">
            <div class="input-title">기념품명</div>
            <input
                v-model="title"
                type="text"
                placeholder="기념품 이름을 입력하세요."
                class="title-input" />
        </div>
        <div class="input-info">
            <div class="input-title">카테고리</div>
            <select v-model="category" class="title-input">
                <option value="사무문구">사무문구</option>
                <option value="생활잡화">생활잡화</option>
                <option value="악세서리">악세서리</option>
                <option value="디지털전자">디지털전자</option>
                <option value="주방식품">주방식품</option>
            </select>
        </div>
        <div class="d-flex" style="gap: 32px; margin-left: 12px">
            <div class="input-info" style="flex: 1">
                <div class="input-title">가ㅤ격</div>
                <input
                    v-model="price"
                    type="text"
                    placeholder="기념품 가격을 입력하세요."
                    class="title-input" />
            </div>
            <div class="input-info" style="flex: 1">
                <div class="input-title">수ㅤ량</div>
                <input
                    v-model="quantity"
                    type="text"
                    placeholder="기념품 수량을 입력하세요."
                    class="title-input" />
            </div>
        </div>
        <div class="d-flex" style="gap: 32px; margin-left: 12px">
            <div class="input-info" style="flex: 1">
                <div class="input-title">판 매 량</div>
                <input
                    v-model="sold"
                    type="text"
                    placeholder="기념품 판매량을 입력하세요."
                    class="title-input" />
            </div>
            <div class="input-info" style="flex: 1">
                <div class="input-title">잔여수량</div>
                <input
                    v-model="remaining"
                    type="text"
                    placeholder="기념품 잔여수량을 입력하세요."
                    class="title-input" />
            </div>
        </div>
        <!-- 에디터 -->
        <div class="input-info">
            <div class="input-title" style="margin-bottom: 500px">상세설명</div>
            <div class="editor-wrapper">
                <div id="editor" />
            </div>
        </div>
    </div>

    <!-- 버튼 -->
    <div class="button-wrapper">
        <button class="cancel-btn" @click="onCancel">취소</button>
        <button class="submit-btn" @click="onSubmit">등록</button>
    </div>
</template>

<script setup>
import { createGoods } from '@/features/goods/api.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResize from 'quill-resize-module';
Quill.register('modules/resize', QuillResize);

const router = useRouter();
const title = ref('');
const category = ref('사무문구');
const price = ref('');
const quantity = ref('');
const sold = ref('');
const remaining = ref('');
let quill;

onMounted(() => {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
    ];

    quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions,
            resize: {
                parchment: {
                    image: {
                        attribute: ['width'],
                        limit: {
                            minWidth: 200,
                            maxWidth: 1000,
                            maxHeight: 1000,
                        },
                    },
                },
            },
        },
        theme: 'snow',
        placeholder: '기념품 상세설명을 작성해 주세요.',
    });
});

const onCancel = () => {
    router.back();
};

const onSubmit = async () => {
    const content = quill.root.innerHTML;

    const payload = {
        title: title.value.trim(),
        detail: content,
        quantity: Number(quantity.value) || 0,
        sold: Number(sold.value) || 0,
        remaining: Number(remaining.value) || 0,
        price: Number(price.value) || 0,
        goodsCategoryId: mapCategoryNameToId(category.value),
    };

    console.log('payload: ', payload);
    try {
        const res = await createGoods(payload);
        console.log('등록 성공:', res.data);
        router.push('/goods');
    } catch (err) {
        alert(err.message || '등록에 실패했습니다.');
    }
};

function mapCategoryNameToId(name) {
    const map = {
        사무문구: 1,
        생활잡화: 2,
        악세서리: 3,
        디지털전자: 4,
        주방식품: 5,
    };
    return map[name] || 0;
}
</script>

<style scoped>
.editor-page {
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 80px 200px;
}

.header {
    margin-bottom: 68px;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
}

.input-info {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
}

.input-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: black;
    justify-content: flex-start;
    display: flex;
    width: 120px;
    margin-bottom: 16px;
}

.title-input {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.editor-wrapper {
    border-radius: 10px;
}

.editor-wrapper {
    width: 786px;
    height: 500px;
    background: white;
    border-radius: 10px;
}

::v-deep .ql-editor {
    padding: 10px;
    font-size: 1.2rem;
    min-height: 480px;
}

.button-wrapper {
    text-align: center;
    margin-top: 40px;
}
.cancel-btn,
.submit-btn {
    font-size: 1.5rem;
    width: 100px;
    height: 48px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
.cancel-btn {
    background-color: #f5f5f5;
    color: #333;
    margin-right: 10px;
}
.submit-btn {
    background-color: black;
    color: white;
}
</style>
