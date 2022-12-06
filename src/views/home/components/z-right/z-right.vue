<template>
    <div class="z-right">
        <z-border>
            <template #header_left>广东省地市数据</template>
            <template #header_right>
                <z-sort v-model="sortValue" @change="changeEvt" :group="sortGroup"></z-sort>
            </template>
            <gd-rank-echart></gd-rank-echart>
        </z-border>
    </div>
</template>
<script setup name='z-right' lang="ts">
import { ref } from 'vue'
import { SortEnum } from '@/constant'
import gdRankEchart from '../../echart/gd-rank-echart.vue'
import { useGlobalStore } from '@/store/index'
const store = useGlobalStore()
const sortValue = ref<string>(SortEnum.TODAY_CONFIRM.KEY)
const sortGroup =
    [SortEnum.TODAY_CONFIRM, SortEnum.TOTAL_CONFIRM]

const changeEvt = (e: string) => {
    store.setGuangDongRank(e as keyof MainData.Base)
}
</script>
<style scoped lang='scss'>
.z-right {
    height: calc(100% - 10px);
    margin-bottom: 10px;
}
</style>