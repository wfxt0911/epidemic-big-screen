import { defineStore, createPinia } from "pinia";
import { getMaxArr, addCardData } from '@/utils'
import { GlobalState } from "./interface";
import { SortEnum } from '@/constant/index'
import _ from 'lodash'

import http from '@/api'
const url = '/163/ug/api/wuhan/app/data/list-total'

export const useGlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		fullData: {},
		worldRank: [],
		chinaData: {},
		chinaRank: [],
		guangdongData: {},
		guangdongRank: [],
		lastUpdateTime: '',
		countryCardData: {
			cardData: []
		},
		guangdongCardData: {
			cardData: []
		}
	}),
	getters: {},
	actions: {
		getData() {
			http.get<MainData.ResData>(url).then(res => {
				const { code, data } = res
				if (code !== 10000) return
				if (!data) return
				this.fullData = data
				this.lastUpdateTime = data.lastUpdateTime
				this.setDefault()

			})
		},
		setDefault() {
			this.getChinaData()
			this.getGuangdongData()
			this.setCountryCardData()
			this.setGuangDongCardData()
			this.setWorldRank(SortEnum.TODAY_CONFIRM.KEY as keyof MainData.Base);
			this.setChinaRank(SortEnum.TODAY_CONFIRM.KEY as keyof MainData.Base);
			this.setGuangDongRank(SortEnum.TODAY_CONFIRM.KEY as keyof MainData.Base);


		},
		getChinaData() {
			if (!this.fullData.areaTree) return
			const index = this.fullData.areaTree.findIndex(o => o.name == '中国')
			if (!this.fullData.areaTree[index]) return
			this.chinaData = this.fullData.areaTree[index]
		},
		getGuangdongData() {
			if (!this.chinaData.children) return
			const index = this.chinaData.children.findIndex(o => o.name == '广东')
			if (!this.chinaData.children[index]) return
			let _tmp_arr = _.cloneDeep(this.chinaData.children[index])
			_tmp_arr.children = _tmp_arr.children.filter(item => {
				//这两个数据不太规范不要它
				if (!["境外输入人员", "未明确地区"].includes(item.name)) {
					return item
				}
			}) as MainData.Area[]
			this.guangdongData = _tmp_arr
		},
		setWorldRank(sortName: keyof MainData.Base) {
			//此处必须使用深拷贝，否则相互依赖过多处理速度贼慢
			switch (sortName) {
				case SortEnum.TODAY_CONFIRM.KEY:
					this.worldRank = getMaxArr(_.cloneDeep(this.fullData.areaTree) as MainData.Area[], o => o.today.confirm);
					break;
				case SortEnum.TOTAL_CONFIRM.KEY:

					this.worldRank = getMaxArr(_.cloneDeep(this.fullData.areaTree) as MainData.Area[],
						o => (o.total.confirm || 0 - (o.total.heal || 0) - (o.total.dead || 0)));
					break;
				default:
					this.worldRank = getMaxArr(_.cloneDeep(this.fullData.areaTree) as MainData.Area[], o => o.total[sortName]);
					break;
			}
		},
		setChinaRank(sortName: keyof MainData.Base) {
			//此处必须使用深拷贝，否则相互依赖过多处理速度贼慢
			const _tmp_china = _.cloneDeep(this.chinaData)
			if (!_tmp_china.children) return
			switch (sortName) {
				case SortEnum.TODAY_CONFIRM.KEY:
					this.chinaRank = getMaxArr(_tmp_china.children, o => o.today.confirm);
					break;
				case SortEnum.TOTAL_CONFIRM.KEY:

					this.chinaRank = getMaxArr(_tmp_china.children,
						o => (o.total.confirm || 0 - (o.total.heal || 0) - (o.total.dead || 0)));
					break;
				default:
					this.chinaRank = getMaxArr(_tmp_china.children, o => o.total[sortName]);
					break;
			}
		},
		setGuangDongRank(sortName: keyof MainData.Base) {
			//此处必须使用深拷贝，否则相互依赖过多处理速度贼慢
			const _tmp_guangdong = _.cloneDeep(this.guangdongData)
			if (!_tmp_guangdong.children) return
			switch (sortName) {
				case SortEnum.TODAY_CONFIRM.KEY:
					this.guangdongRank = getMaxArr(_tmp_guangdong.children, o => o.today.confirm, 24);
					break;
				case SortEnum.TOTAL_CONFIRM.KEY:

					this.guangdongRank = getMaxArr(_tmp_guangdong.children,
						o => (o.total.confirm || 0 - (o.total.heal || 0) - (o.total.dead || 0)),
						24
					);
					break;
				default:
					this.guangdongRank = getMaxArr(_tmp_guangdong.children, o => o.total[sortName], 24);
					break;
			}
		},
		setCountryCardData() {
			if (!this.fullData.chinaTotal) return;
			const chinaTotal = _.cloneDeep(this.fullData.chinaTotal)
			this.countryCardData.cardData.push(addCardData(chinaTotal, '累计确诊', 'confirm', '#a31d34'))
			this.countryCardData.cardData.push({
				title: '累计确诊',
				total: chinaTotal.total && (chinaTotal.total.confirm as number) - (chinaTotal.total.dead as number) - (chinaTotal.total.heal as number),
				today: chinaTotal.today && chinaTotal.today.storeConfirm as number,
				color: '#e44a3d'
			})
			this.countryCardData.cardData.push({
				title: '无症状感染者',
				total: chinaTotal.extData && chinaTotal.extData.noSymptom,
				today: chinaTotal.extData && chinaTotal.extData.incrNoSymptom,
				color: '#f1c40f'
			})
			this.countryCardData.cardData.push(addCardData(chinaTotal, '累计死亡', 'dead', '#8e44ad'))
			this.countryCardData.cardData.push(addCardData(chinaTotal, '累计治愈', 'heal', '#41af79'))
		},
		setGuangDongCardData() {
			if (!this.guangdongData) return;
			const guangdongData = _.cloneDeep(this.guangdongData)
			this.guangdongCardData.cardData.push(addCardData(guangdongData, '累计确诊', 'confirm', '#a31d34'))
			this.guangdongCardData.cardData.push(addCardData(guangdongData, '累计死亡', 'dead', '#8e44ad'))
			this.guangdongCardData.cardData.push(addCardData(guangdongData, '累计治愈', 'heal', '#41af79'))
		}


	},
});

const pinia = createPinia();

export default pinia;
