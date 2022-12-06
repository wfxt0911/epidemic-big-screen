<template>
    <div class="z-card-data h-full">
        <div class="z-card-data__wrapper flex h-full">
            <div class="z-card-data__group flex-1 text-center h-full" v-for="(item, index) in cardData" :key="index">
                <div class="z-card-data__item h-full flex flex-col items-center justify-center">
                    <div class="text-lg  text-primary">{{ item.title }}</div>
                    <div class="my-1 font-Metro text-opposite text-xl" :style="{ color: item.color }">{{ item.total }}
                    </div>
                    <div class="a leading-5 h-5 flex items-center">
                        <span class="text-primary  text-xs">较昨日</span>
                        <span class="font-Metro text-opposite text-lg ml-2" :style="{ color: item.color }">+</span>
                        <span class="font-Metro text-opposite text-lg" :style="{ color: item.color }">{{ item.today
                        }}</span>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup name='z-card-data' lang="ts">
import { ref, defineProps } from 'vue'
// import {CardDataProps} from '@/components/z-card-data/typing'
export interface CardDataProps {
    cardData: CardItem[]

}
export interface CardItem {
    title: string,
    total: Number,
    today: Number,
    color: string
}
const props = defineProps<CardDataProps>()

</script>
<style scoped lang='scss'>
.z-card-item {}
</style>