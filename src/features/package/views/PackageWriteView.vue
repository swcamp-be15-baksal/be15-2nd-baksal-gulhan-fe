<template>
    <div class="editor-page">
        <header class="header">패키지 등록</header>
        <!-- 제목 입력창 -->
        <div class="input-info">
            <div class="input-title">패키지명</div>
            <input
                v-model="title"
                type="text"
                placeholder="패키지 이름을 입력하세요."
                class="title-input" />
        </div>
        <div class="input-info">
            <div class="input-title">날ㅤ짜</div>
            <input
                v-model="date"
                type="text"
                placeholder="날짜를 입력하세요."
                class="title-input" />
        </div>
        <div class="input-info">
            <div class="input-title" style="margin-bottom: 172px">출 발 지</div>
            <div style="display: flex; flex-direction: column; width: 100%">
                <div class="d-flex" style="gap: 20px">
                    <input
                        type="text"
                        placeholder="우편번호"
                        v-model="formData.postcode"
                        class="title-input"
                        :disabled="disabled" />
                    <button class="postcode-button" type="button" @click="searchPostcode">
                        검색
                    </button>
                </div>
                <input
                    type="text"
                    v-model="formData.address"
                    placeholder="기본 주소"
                    class="title-input"
                    :disabled="disabled" />
                <input
                    type="text"
                    v-model="formData.detailAddress"
                    class="title-input"
                    placeholder="상세 주소"
                    :disabled="disabled" />
            </div>
        </div>
        <div class="d-flex" style="gap: 32px">
            <div class="input-info" style="flex: 1">
                <div class="input-title">가ㅤ격</div>
                <input
                    v-model="price"
                    type="text"
                    placeholder="패키지 가격을 입력하세요."
                    class="title-input"
                    style="margin-left: 18px" />
            </div>
            <div class="input-info" style="flex: 1">
                <div class="input-title">인ㅤ원</div>
                <input
                    v-model="quantity"
                    type="text"
                    placeholder="패키지 인원을 입력하세요."
                    class="title-input"
                    style="margin-left: 18px" />
            </div>
        </div>
        <div class="d-flex" style="gap: 32px">
            <div class="input-info" style="flex: 1">
                <div class="input-title">신청인원</div>
                <input
                    v-model="sold"
                    type="text"
                    placeholder="패키지 신청인원을 입력하세요."
                    class="title-input"
                    style="margin-left: 18px" />
            </div>
            <div class="input-info" style="flex: 1">
                <div class="input-title">잔여인원</div>
                <input
                    v-model="remaining"
                    type="text"
                    placeholder="패키지 잔여인원을 입력하세요."
                    class="title-input"
                    style="margin-left: 18px" />
            </div>
        </div>
        <div class="d-flex">
            <div class="input-title" style="margin-top: 10px">가 이 드</div>
            <div style="width: 100%">
                <div class="d-flex" style="gap: 32px">
                    <div class="input-info" style="flex: 1">
                        <div class="input-title">이ㅤ름</div>
                        <input
                            v-model="guide.name"
                            type="text"
                            placeholder="가이드의 이름을 입력하세요."
                            class="title-input"
                            style="margin-left: 18px" />
                    </div>
                    <div class="input-info" style="flex: 1">
                        <div class="input-title">성ㅤ별</div>
                        <select
                            v-model="guide.gender"
                            class="title-input"
                            style="margin-left: 18px">
                            <!-- v-model을 guide.gender로 변경 -->
                            <option value="남">남</option>
                            <option value="여">여</option>
                        </select>
                    </div>
                </div>
                <div class="input-info">
                    <div class="input-title">전화번호</div>
                    <input
                        v-model="guide.phone"
                        type="text"
                        placeholder="가이드의 전화번호를 입력하세요."
                        class="title-input" />
                </div>
                <div class="input-info">
                    <div class="input-title">이 메 일</div>
                    <input
                        v-model="guide.email"
                        type="text"
                        placeholder="가이드의 이메일을 입력하세요."
                        class="title-input" />
                </div>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResize from 'quill-resize-module';
Quill.register('modules/resize', QuillResize);

const router = useRouter();
const title = ref('');
const date = ref('');
const departure = ref('');
const price = ref('');
const quantity = ref('');
const sold = ref('');
const remaining = ref('');
const formData = ref({
    postcode: '',
    address: '',
    detailAddress: '',
});
const guide = ref({
    name: '',
    gender: '남',
    phone: '',
    email: '',
});

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
        placeholder: '패키지 상세설명을 작성해 주세요.',
    });
});

const onCancel = () => {
    router.back();
};

const onSubmit = () => {
    const content = quill.root.innerHTML;
    console.log('제목:', title.value);
    console.log('날짜:', date.value);
    console.log('출발지:', departure.value);
    console.log('가격:', price.value);
    console.log('수량:', quantity.value);
    console.log('판매량:', sold.value);
    console.log('잔여수량:', remaining.value);
    console.log('내용:', content);
};

function searchPostcode() {
    new window.daum.Postcode({
        oncomplete: function (data) {
            formData.value.postcode = data.zonecode;
            formData.value.address = data.roadAddress !== '' ? data.roadAddress : data.jibunAddress;
            nextTick(() => {
                document.getElementById('detail-address')?.focus();
            });
        },
    }).open();
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
    align-items: center;
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

#editor {
    margin: 0 0;
    width: 786px;
    height: 500px;
    background: white;
    padding: 10px;
    font-size: 1.2rem;
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
.postcode-button {
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: white;
    width: 80px;
    height: 52px;
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
