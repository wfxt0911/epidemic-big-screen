
<template>
    <dv-full-screen-container>
        <z-header></z-header>
        <div class="wrapper__main">
            <z-left></z-left>
            <z-center></z-center>
            <z-right></z-right>
        </div>
        <z-announcement @close="closeAnnouncement" v-if="isShowAnnounce"></z-announcement>
    </dv-full-screen-container>
</template>
<script setup name='home' lang="ts">
import { ref, onMounted } from 'vue'
import zHeader from './components/z-header/z-header.vue'
import zLeft from './components/z-left/z-left.vue'
import zRight from './components/z-right/z-right.vue'
import zCenter from './components/z-center/z-center.vue'
import zAnnouncement from './components/z-announcement/index.vue'
import { useGlobalStore } from '@/store/index'
const store = useGlobalStore()
store.getData()
const isShowAnnounce = ref<boolean>(true)
const closeAnnouncement = () => {
    isShowAnnounce.value = false
}
</script>
<style scoped lang='scss'>
.home {
    color: #fff;


}

#dv-full-screen-container,
.full-screen,
.dv-full-screen-container {
    background-image: url('../../assets/images/home/bg.jpg');
    background-size: 100% 100%;
}

.wrapper {
    &__main {
        height: calc(100% - 60px);
        display: flex;
        justify-content: space-around;

        .z-left,
        .z-right {
            width: calc(25% - 10px);
        }

        .z-center {
            width: calc(50% - 20px);
            margin: 0 10px;

        }

        .z-left {
            margin-left: 10px;
        }

        .z-right {
            margin-right: 10px;
        }
    }
}
</style>