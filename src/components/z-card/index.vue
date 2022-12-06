<template>
    <div class="z-card h-full">
        <dv-border-box-10 :color="color">
            <div class="z-card__wrapper flex flex-col h-full">
                <div class="z-card__header text-primary" v-if="instance.slots.header">
                    <slot name="header"></slot>
                </div>
                <div class="z-card__main p-3 flex-1">
                    <slot></slot>
                </div>
            </div>
        </dv-border-box-10>

    </div>
</template>
<script setup name='z-card' lang='ts'>
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue'
import variables from '@/styles/variables.module.scss'
const color = [variables.primary, variables.opposite]
const instance = getCurrentInstance() as ComponentInternalInstance;

defineProps({});
</script>
<style scoped lang='scss'>
.z-card {
    &__header {
        height: 50px;
        border-color: $primary;
        @apply  border-b mx-6 text-xl pt-2 flex justify-center items-center pb-1;


    }
}
</style>