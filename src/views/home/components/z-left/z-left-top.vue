<template>
    <div class="z-left-top">
        <z-border >
            <template #header_left>国内疫情形势</template>
            <template #header_right>
                <z-sort v-model="sortValue" @change="changeEvt" :group="sortGroup"></z-sort>
            </template>
            <china-rank-echart></china-rank-echart>
        </z-border>
    </div>
</template>
<script setup name='z-left-top' lang="ts">
import { ref } from 'vue'
import { SortEnum } from '@/constant'
import chinaRankEchart from '../../echart/china-rank-echart.vue'
import { useGlobalStore } from '@/store/index'
const store = useGlobalStore()
const sortValue = ref<string>(SortEnum.TODAY_CONFIRM.KEY)
const sortGroup =
    // [SortEnum.TODAY_CONFIRM, SortEnum.TOTAL_CONFIRM,SortEnum.HEAL, SortEnum.DEAD]
    [SortEnum.TODAY_CONFIRM, SortEnum.TOTAL_CONFIRM]

const changeEvt = (e: string) => {
    store.setChinaRank(e as keyof MainData.Base)
}

</script>
<style scoped lang='scss'>
.z-left-top {}
</style>