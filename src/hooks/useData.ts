
import { onMounted, reactive ,onBeforeMount} from 'vue'
import http from '@/api'
import { getFlatArr, getMaxArr } from '@/utils'
import { useGlobalStore } from '@/store/index'
const url = '/163/ug/api/wuhan/app/data/list-total'

export const useData = (count = 10) => {
    const {$state} = useGlobalStore()
    const chinaTotal: Partial<MainData.ChinaTotal> = reactive({})



    const getData = async () => {

        const { data } = await http.get<MainData.ResData>(url);
        if (!data) return
        $state.worldRank = getMaxArr(data.areaTree, o => o.total.confirm, count)
        console.log("🚀 ~ file: useData.ts ~ line 27 ~ getData ~ getData")

        // chinaData.value = data.areaTree[data.areaTree.findIndex(o => o.name == '中国')]
        // if (!chinaData.value.children || chinaData.value.children.length <= 0) return
        // chinaRank.value = getMaxArr(chinaData.value.children, o => (o.total.confirm || 0 - (o.total.heal || 0) - (o.total.dead || 0)))

    }
    onMounted(() => {
        getData()
    })
    return {
        getData
    }
}