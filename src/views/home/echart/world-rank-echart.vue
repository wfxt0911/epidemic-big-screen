<template>
    <div class="world-rank-echart w-full h-full">
        <div ref="echartRef" class="w-full h-full"></div>
    </div>
</template>
<script setup name='world-rank-echart' lang="ts">
import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
import { useEchart } from '@/hooks/useEchart'
import { useGlobalStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import { EchartColors } from '@/constant/index'
import _ from 'lodash'
const echartRef = ref<HTMLElement | null>(null)
const store = useGlobalStore()
const { worldRank } = storeToRefs(store)
const setOpetion = () => {
    const nameArray = worldRank.value.map(item => item.name)
    const valueArray = worldRank.value.map(item => item.echartValue)
    return {
        grid: {
            left: "20%",
            right: "22%",
            bottom: "0%",
            top: "0%",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "none"
            },
            borderWidth: 0, //边框线宽
            padding: 0,
            backgroundColor: "transparent",

            textStyle: {
                color: '#ffffff'
            },
            formatter: (param: any) => {
                let dom = `
                    <div class="z-tooltip">
                      <div class="z-tooltip__header">${param[0].data.name}</div>
                      <div class="z-tooltip__main">
                        <div class="z-tooltip__group">
                            <span class="z-tooltip__group--item-label">新增确诊</span>
                            <span class="z-tooltip__group--item-value">${param[0].data.today.confirm}</span>
                        </div>
                        <div class="z-tooltip__group">
                            <span class="z-tooltip__group--item-label">新增治愈</span>
                            <span class="z-tooltip__group--item-value">${param[0].data.today.heal}</span>
                        </div>
                        <div class="z-tooltip__group">
                            <span class="z-tooltip__group--item-label">新增死亡</span>
                            <span class="z-tooltip__group--item-value">${param[0].data.today.dead}</span>
                        </div>
                      </div>
                    </div>
                  `;
                return dom;
            }
        },
        xAxis: [
            {
                show: false,
            },
            {
                show: false,
            },
        ],
        yAxis: [
            {
                show: false,
                inverse: true,
                data: valueArray,
            },
            {
                show: true,
                data: valueArray,
                offset: 6,
                position: "right",
                inverse: true,
                axisLabel: {
                    lineHeight: 0,
                    verticalAlign: "bottom",
                    fontSize: 12,
                    color: "#fff",
                    formatter: "{value}",
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: "完整数据",
                show: false,
                type: "bar",
                data: worldRank.value
            },
            {
                name: "进度",
                show: true,
                type: "bar",
                barGap: "-100%",
                xAxisIndex: 1,
                barWidth: 4,
                itemStyle: {
                    borderRadius: 4,
                    color: (params: any) => {
                        var num = EchartColors.length;
                        return {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#9AECDB",

                                },
                                {
                                    offset: 1,
                                    color: EchartColors[params.dataIndex % num],
                                },
                            ],
                        };
                    },
                },
                label: {
                    show: false,
                },
                // max: 0,
                labelLine: {
                    show: false,
                },
                z: 2,
                data: valueArray,
                animationDelay: 500,
                animationDuration: 500
            },
            {
                name: "外圆",
                type: "scatter",
                emphasis: {
                    scale: false,
                },
                xAxisIndex: 1,
                symbolSize: 10,
                itemStyle: {
                    color: (params: any) => {
                        var num = EchartColors.length;
                        return EchartColors[params.dataIndex % num];
                    },
                    shadowColor: "rgba(255, 255, 255, 0.5)",
                    shadowBlur: 5,
                    borderWidth: 1,
                    opacity: 1,
                },
                z: 2,
                data: valueArray,
                animationDelay: 1500,
                animationDuration: 1000
            },
            {
                name: "国家",
                z: 1,
                show: true,
                type: "bar",
                xAxisIndex: 1,
                barGap: "-100%",
                barWidth: 4,
                itemStyle: {
                    borderRadius: 4,
                    color: "rgba(13, 55, 78, 1)",
                },
                label: {
                    show: true,
                    verticalAlign: "middle",
                    position: "left",
                    fontSize: 12,
                    color: "#fff",
                    formatter: function (data: any) {
                        return nameArray[data.dataIndex] + "：";
                    },
                },
                data: valueArray,
            },
        ],

    }
}
useEchart(echartRef, () => worldRank, setOpetion)


</script>
<style scoped lang='scss'>
.world-rank-echart {}
</style>