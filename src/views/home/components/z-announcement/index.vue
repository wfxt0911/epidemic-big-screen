<template>
    <div class="z-announcement h-full w-full absolute top-0 left-0">
        <div class="z-announcement__mask h-full z-50">
            <div class="z-announcement__wrapper  absolute top-1/3 left-0 -translate-x-1/2 -translate-y-1/2">
                <dv-border-box-11 class=" text-white" title="郑重告知" backgroundColor="#082c5c" ref="popupsRef">
                    <div class="text-lg leading-8">
                        <span>一个基于Vue3、Vite、DataV、Echart、TypeScript、pinia、vue-router等技术栈实现的</span>
                        <span class="a font-bold text-gradient2 text-3xl mx-2">数据大屏项目</span>
                        <span>,</span>
                        <span>此项目使用到的数据可能存在</span>
                        <span class="font-bold text-red-500 text-xl mx-2">误差</span>
                        <span>,正确的数据请到相关网站查阅,此项目主要的侧重于前端技术站栈的练习,不在于数据本身,</span>
                        <span>此外，全屏展示效果更佳，浏览器全屏API只允许用户手动触发，请手动按下键盘的</span>
                        <span class="font-bold text-red-500 text-xl mx-2">F11</span>
                        <span>进行</span>
                        <span class="font-bold text-red-500 text-xl mx-2">全屏</span>
                        <span>浏览。</span>

                        <div class="text-center mt-2">
                            <span>弹窗将</span>
                            <span class=" text-red-500 text-2xl mx-3">{{ count }}</span>
                            <span>秒后自动关闭</span>
                        </div>
                    </div>

                </dv-border-box-11>
            </div>
        </div>
    </div>
</template>
<script setup name='z-announcement' lang='ts'>
import { ref, onMounted } from 'vue'
import { BorderBox11 } from '@kjgl77/datav-vue3'
import anime from 'animejs';
const popupsRef = ref<InstanceType<typeof BorderBox11>>()
const timer = ref<NodeJS.Timer | null>(null)
const count = ref<number>(0)
const time: number = (15)
const emits = defineEmits(['close'])
onMounted(() => {
    const fullScreenDom = document.getElementById('dv-full-screen-container')
    const screenWidth = Number(fullScreenDom?.style.width.replace('px', ''))
    anime({
        targets: popupsRef.value && popupsRef.value.$el,
        translateX: [{
            value: screenWidth / 2,
            duration: 1000
        }, {
            value: screenWidth + (popupsRef.value && popupsRef.value.$el.children[0].clientWidth),
            duration: 1000,
            delay: time * 1000
        }],
    });
    count.value = time
    timer.value = setInterval(() => {
        if (count.value > 0) {
            count.value--
        } else {
            timer.value && clearInterval(timer.value)
            timer.value = null
            emits('close')
        }
    }, 1000)
})

</script>
<style scoped lang='scss'>
.z-announcement {

    &__mask {
        background-color: rgba($color: #95a5a6, $alpha: 0.8);
        z-index: 9999;
    }

    &__wrapper {
        width: 400px;
        height: 460px;
    }

    ::v-deep .border-box-content {
        position: absolute;
        top: 80px;
        left: 43px;
        width: calc(100% - 80px);
        height: calc(100% - 100px);
    }



}
</style>