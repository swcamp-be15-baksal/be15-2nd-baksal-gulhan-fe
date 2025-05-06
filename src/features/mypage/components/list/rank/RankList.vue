<template>
  <div
    class="position-absolute start-0 mt-2 bg-white border rounded shadow-sm p-3 z-3"
    style="font-size: 0.85rem; white-space: nowrap;"
  >
    <ul class="list-unstyled mb-0">
      <li class="mb-1 d-flex align-items-center">
        <img class="me-2" :src="kingIcon" alt="king" width="18" height="18" />
        <strong>왕</strong>: 4% 적립
      </li>
      <li class="mb-1 d-flex align-items-center">
        <img class="me-2" :src="nobleIcon" alt="noble" width="18" height="18" />
        <strong>양반</strong>: 3% 적립
      </li>
      <li class="mb-1 d-flex align-items-center">
        <img class="me-2" :src="junginIcon" alt="jungin" width="18" height="18" />
        <strong>중인</strong>: 2% 적립
      </li>
      <li class="mb-1 d-flex align-items-center">
        <img class="me-2" :src="commonerIcon" alt="commoner" width="18" height="18" />
        <strong>평민</strong>: 1% 적립
      </li>
      <li class="d-flex align-items-center">
        <img class="me-2" :src="slaveIcon" alt="slave" width="18" height="18" />
        <strong>노비</strong>: 관리자
      </li>
    </ul>
  </div>
</template>

<script setup>
import kingIcon from '@/assets/icons/king.svg';
import nobleIcon from '@/assets/icons/noble.svg';
import junginIcon from '@/assets/icons/jungin.svg';
import commonerIcon from '@/assets/icons/commoner.svg';
import slaveIcon from '@/assets/icons/slave.svg';
</script>
