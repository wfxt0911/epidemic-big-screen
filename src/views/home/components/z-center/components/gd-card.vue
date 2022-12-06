<template>
    <div class="gd-card">
        <z-card>
            <template #header>广东疫情数据</template>
            <template #default>
                <z-card-data :cardData="guangdongCardData.cardData"></z-card-data>
            </template>
        </z-card>

    </div>
</template>
<script setup name='gd-card' lang='ts'>
import { useGlobalStore } from '@/store/index'
import { storeToRefs } from 'pinia'
const store = useGlobalStore()
const { guangdongCardData } = storeToRefs(store)

</script>
<style scoped lang='scss'>

</style>