<template>
    <div class="z-left">
        <z-left-top></z-left-top>
        <z-left-bottom></z-left-bottom>
    </div>
</template>
<script setup name='z-left' lang="ts">
import { ref } from 'vue'
import zLeftTop from './z-left-top.vue'
import zLeftBottom from './z-left-bottom.vue'

</script>
<style scoped lang='scss'>
.z-left {
    .z-left-top,
    .z-left-bottom {
        height: calc(100% / 2 - 10px);
        margin-bottom: 10px;
    }
}
</style>