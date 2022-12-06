<template>
    <div class="full-screen" ref="fullScreenRef">
        <slot></slot>
    </div>
</template>
<script setup name='full-screen' lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
const fullScreenRef = ref<HTMLElement | null>(null);
/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
};

/* 浏览器监听 resize 事件 */
const resize = () => {
    if (fullScreenRef.value) {
        fullScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    }
};
onMounted(() => {
    // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
    if (fullScreenRef.value) {
        fullScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        fullScreenRef.value.style.width = `1920px`;
        fullScreenRef.value.style.height = `1080px`;
    }
    window.addEventListener("resize", resize);
});
/* 销毁时触发 */
onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
});
</script>
<style scoped lang='scss'>
.full-screen {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;
    background-color: transparent;
}
</style>