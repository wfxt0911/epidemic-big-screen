<template>
    <div class="z-sort mb-2">
        <a-radio-group v-model:value="value" button-style="solid" size="small" @change="changeEvt">
            <a-radio-button :value="item.KEY" v-for="item in group" :key="item">{{ item.LABEL }}</a-radio-button>
        </a-radio-group>
    </div>
</template>
<script setup name='z-sort' lang="ts">
import { ref, withDefaults } from 'vue'
import { useVModel } from '@vueuse/core'
import { SortEnum, SortList } from '@/constant'
import { SortItem } from '@/constant/interface'

interface SortProps {
    group?: SortItem[],
    modelValue: string
}

// 默认值
const props = withDefaults(defineProps<SortProps>(), {
    group: () => SortList
});

//数据双向绑定
type EmitProps = {
    (e: "update:modelValue", val: string): void;
    (e: "change", val: any): void;
};
const emits = defineEmits<EmitProps>()
const value = useVModel(props, 'modelValue', emits)
const changeEvt = (e: any) => {
    emits('change', e.target.value)
}
</script>
<style scoped lang='scss'>
.z-sort {
    .ant-radio-button-wrapper:focus-within {
        box-shadow: unset;
    }

    .ant-radio-button-wrapper {
        background-color: transparent;
        color: $auxiliary;
        border-color: $primary;
        font-size: 12px;
        padding-top: 1px;

        &-checked {
            color: #fff;
            background-color: $primary;
        }

        &::before {
            background-color: unset;
        }
    }
}
</style>