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
            <div class="input-info" style="gap: 12px">
                <div class="input-title">출발일</div>
                <input v-model="startDate" type="date" class="title-input" />
            </div>
            <div class="input-info">
                <div class="input-title">종료일</div>
                <input v-model="endDate" type="date" class="title-input" />
            </div>
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
import { createPackage, updatePackage } from '@/features/package/api.js';
import { fetchPackageDetail } from '@/features/package/api';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResize from 'quill-resize-module';
import dayjs from 'dayjs';
Quill.register('modules/resize', QuillResize);

const route = useRoute();
const packageId = route.query.packageId;
const router = useRouter();
const title = ref('');
const startDate = ref('');
const endDate = ref('');

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

onMounted(async () => {
    if (packageId) {
        try {
            const response = await fetchPackageDetail(packageId);
            const detail = response.data.data; // ✅ 여기 핵심 포인트

            console.log('[package 수정모드] 불러온 데이터:', detail);

            title.value = detail.title;
            startDate.value = detail.startDate?.slice(0, 10);
            endDate.value = detail.endDate?.slice(0, 10);
            price.value = detail.price?.toString() || '';
            quantity.value = detail.capacity?.toString() || '';
            remaining.value = detail.remaining?.toString() || '';

            formData.value.address = detail.area || '';
            formData.value.detailAddress = '';
            formData.value.postcode = '';

            guide.value.name = detail.guideName || '';
            guide.value.phone = detail.guidePhone || '';
            guide.value.email = detail.guideEmail || '';
            guide.value.gender = detail.guideGender === 'M' ? '남' : '여';

            nextTick(() => {
                if (quill && detail.detail) {
                    quill.root.innerHTML = detail.detail;
                }
            });
        } catch (err) {
            console.error('수정모드: 상세조회 실패', err);
        }
    }
});

const disabled = ref(false);

const onSubmit = async () => {
    const content = quill.root.innerHTML;
    const genderCode = guide.value.gender === '남' ? 'M' : 'F';

    const payload = {
        title: title.value.trim(),
        detail: content,
        area: formData.value.address.split(' ').slice(0, 2).join(' '),
        price: Number(price.value) || 0,
        capacity: Number(quantity.value) || 0,
        // currentRegist: Number(sold.value) || 0,
        remaining: Number(remaining.value) || 0,
        startDate: dayjs(startDate.value).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: dayjs(endDate.value).format('YYYY-MM-DDTHH:mm:ss'),
        guideName: guide.value.name,
        guideEmail: guide.value.email,
        guidePhone: guide.value.phone,
        guideGender: genderCode,
    };

    try {
        if (packageId) {
            await updatePackage(packageId, payload);
            alert('패키지가 수정되었습니다.');
        } else {
            await createPackage(payload);
            alert('패키지가 등록되었습니다.');
        }
        router.push('/packages');
    } catch (error) {
        console.error('등록/수정 실패:', error);
        alert('처리 중 오류가 발생했습니다.');
    }
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
