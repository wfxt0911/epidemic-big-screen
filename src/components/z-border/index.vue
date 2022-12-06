<template>
    <div class="z-border h-full">
        <dv-border-box-10 :color="[variables.border_color, variables.opposite]">
            <div class="z-border__header text-primary" v-if="instance.slots.header_left || instance.slots.header_right">
                <div class="z-border__header--left">

                    <slot name="header_left"></slot>
                </div>
                <div class="z-border__header--right">
                    <slot name="header_right"></slot>
                </div>


            </div>
            <div class="p-6 z-border__main">
                <slot></slot>
            </div>

        </dv-border-box-10>
    </div>
</template>
<script setup name='z-border' lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import variables from '@/styles/variables.module.scss'
const instance = getCurrentInstance() as ComponentInternalInstance;
</script>
<style scoped lang='scss'>
.z-border {
    &__header {
        height: 50px;
        line-height: 60px !important;
        border-color: $border_color;
        @apply  border-b mx-6 text-xl flex justify-between pt-2;

        &--left,
        &--right {
            @apply flex justify-center items-center;
        }
    }

    &__main {
        height: calc(100% - 50px);
    }
}
</style>