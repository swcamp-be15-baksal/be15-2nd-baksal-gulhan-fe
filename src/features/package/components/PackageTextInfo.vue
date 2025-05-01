<script setup>
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import { ref } from 'vue';
const activeTab = ref('detail');
</script>

<template>
    <div style="margin-top: 124px"></div>
    <div class="page-wrapper">
        <div class="main-wrapper">
            <div class="d-flex tab-wrapper">
                <button
                    class="tab-button"
                    :style="
                        activeTab === 'detail'
                            ? 'background-color:#2C2C2C'
                            : 'background-color: #e6e6e6'
                    "
                    @click="activeTab = 'detail'">
                    상세 정보
                </button>
                <button
                    class="tab-button"
                    :style="
                        activeTab === 'review'
                            ? 'background-color:#2C2C2C'
                            : 'background-color: #e6e6e6'
                    "
                    @click="activeTab = 'review'">
                    리뷰
                </button>
            </div>
            <div class="main">
                <div v-if="activeTab === 'detail'">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.
                    Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio
                    facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec
                    adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor
                    augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
                    Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst
                    quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
                    Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper
                    malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl
                    tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu
                    non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in
                    fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non
                    enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu
                    augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et
                    malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing
                    bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at.
                    Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac
                    odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et
                    magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet.
                    Consequat interdum varius sit amet mattis vulputate enim. Sit amet nulla
                    facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit
                    scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus
                    luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis
                    egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id
                    donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis
                    mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit.
                </div>
                <div v-else><ReviewItem /></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.main-wrapper {
    position: relative;
    width: 100%;
    max-width: 927px;
}

.tab-wrapper {
    position: absolute;
    top: -50px;
    left: 32px;
    display: flex;
    gap: 10px;
    z-index: 1;
}

.tab-button {
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    padding: 0.5rem 1rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: none;
}

.main {
    position: relative;
    max-width: 927px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    padding: 52px 44px;
    font-size: 1.1rem;
    color: black;
    font-weight: 400;
    white-space: pre-wrap;
    /* 나중에 텍스트 에디터로 받으면 위 설정은 필요 없음 
    const container = document.querySelector('.detail-text');
    container.innerHTML = quill.getContents(); // 또는 저장된 HTML */
    text-align: center;
    margin: 0 atuo;
    line-height: 1.6;
    z-index: 10;
}
</style>
