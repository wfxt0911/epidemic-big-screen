<template>
    <div class="gd-map w-full h-full">
        <div ref="echartRef" class="w-full h-full"></div>
    </div>
</template>
<script setup name='gd-map' lang='ts'>
import { ref } from 'vue'
import { useEchart } from '@/hooks/useEchart'
import { useGlobalStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { features, gdGeoCoordMap } from './geoJson'
const echartRef = ref<HTMLElement | null>(null)
const store = useGlobalStore()
const { guangdongData } = storeToRefs(store)
const setOpetion = () => {
    const data = (guangdongData.value.children as MainData.Area[]).map((item: MainData.Area) => {
        return {
            value: item.today.confirm,
            name: item.name
        }
    });
    const convertData2 = function (data: any) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = gdGeoCoordMap[data[i].name + '市'];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    return {
        legend: {
            show: false,
        },
        geo: [{
            map: '广东',
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            show: true,
            roam: false,
            itemStyle: {
                borderColor: '#2ecc71',
                borderWidth: 1,
                shadowOffsetY: 0,
                shadowBlur: 0,
                areaColor: '#2ecc71',
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#2ecc71',
                },
            }
        },
        {
            type: 'map',
            map: '广东',
            zlevel: -2,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ['50%', '51.4%'],
            layoutSize: '180%',
            roam: false,
            silent: true,
            itemStyle: {
                shadowOffsetY: 0,
                shadowBlur: 16,
                areaColor: '#082a52'
            }
        },
        ],
        visualMap: {
            min: 0,
            max: 100000,
            left: 0,
            top: 40,
            showLabel: true,
            text: ['单日新增分布'],
            textStyle: {
                color: '#ffffff'
            },
            pieces: [{
                gt: 50,
                label: "> 50",
                color: "#7f1100"
            }, {
                gte: 10,
                lte: 50,
                label: "10 - 50",
                color: "#ff5428"
            }, {
                gt: 0,
                lt: 10,
                label: "<9",
                color: "#ffd768"
            }, {
                value: 0,
                color: "#2ecc71"
            }],
            show: true
        },
        series: [
            {
                name: '广东省数据',
                type: 'map',
                map: '广东', // 自定义扩展图表类型
                aspectScale: 1,
                zoom: 0.65, //缩放
                showLegendSymbol: false,
                label: {
                    show: true,
                    color: '#ffffff',
                },
                itemStyle: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 300,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#0a56BC' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#12A6F2' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    },
                    borderColor: '#4ECEE6',
                    borderWidth: 1,

                },
                emphasis: {
                    itemStyle: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 300,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#fd79a8', // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#ff7675', // 50% 处的颜色
                                }

                            ],
                            global: true // 缺省为 false
                        },
                    },

                },
                layoutCenter: ['50%', '50%'],
                layoutSize: '180%',
                markPoint: {
                    symbol: 'none'
                },
                data: data,
            },
            // 显示的数据
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [50, 50],
                // symbolOffset: [5, -10],
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return '{tline|' + params.value[2] + '}';
                    },
                    lineHeight: 9,
                    color: '#ffffff',
                    rich: {
                        tline: {
                            padding: [0, 0, 0, 0],
                            color: '#ffffff',
                            fontSize: 9,
                        },
                    },

                },
                itemStyle: {
                    color: '#c0392b',
                },
                z: 999,
                data: convertData2(data),
            }
        ],
    }

}
const geoJson: any = {
    features,
    "type": 'FeatureCollection'
}
echarts.registerMap('广东', geoJson);
useEchart(echartRef, () => guangdongData, setOpetion)

</script>
<style scoped lang='scss'>
.gd-map {}
</style>