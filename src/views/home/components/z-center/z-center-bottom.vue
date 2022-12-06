<template>
    <div class="z-center-bottom">
        <gd-card></gd-card>
        <country-card></country-card>

    </div>
</template>
<script setup name='z-center-bottom' lang="ts">
import { ref } from 'vue'
import gdCard from './components/gd-card.vue'
import countryCard from './components/country-card.vue'

</script>
<style scoped lang='scss'>
.z-center-bottom {

    .country-card,
    .gd-card {
        height: calc(50% - 5px);
    }
    .gd-card {
        margin-bottom: 10px;
    }
}
</style>