import * as echarts from 'echarts'
import type { EChartsType,ECharts } from 'echarts'
import { reactive, ref, toRefs, watch } from 'vue'

export const useEchart = (el: any,
    watchCallback: () => any,
    setOptionFunc: () => Record<string, any>,
) => {

    let echart: EChartsType //此处不能赋值给响应式变量，否则tootip无法显示
    const state = reactive({
        option: {},
        loading: true
    })
    const initEchart = () => {
        echart = echarts.init(el.value)
        echart.setOption(state.option)
    }

    watch(
        watchCallback(),
        (count, prevCount) => {
            state.option = setOptionFunc()
            if (!echart) {
                // 初始化echart
                initEchart()
            } else {
                // 更新数据
                echart.setOption(state.option)
            }
        }
    )
    return {
        ...toRefs(state),
        initEchart
    }
}