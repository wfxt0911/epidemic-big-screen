<template>
    <div class="country-card">
        <z-card>
            <template #header>全国疫情数据</template>
            <template #default>
                <z-card-data :cardData="countryCardData.cardData"></z-card-data>
            </template>
        </z-card>
    </div>
</template>
<script setup name='country-card' lang='ts'>
import { useGlobalStore } from '@/store/index'
import { storeToRefs } from 'pinia'
const store = useGlobalStore()
const { countryCardData } = storeToRefs(store)


</script>
<style scoped lang='scss'>

</style>