import {CardDataProps} from '@/components/z-card-data/typing'


/* GlobalState */
export interface GlobalState {
	fullData: Partial<MainData.ResData>;
	worldRank: MainData.Area[];
	chinaData: Partial<MainData.Area>;
	chinaRank: MainData.Area[];
	guangdongData: Partial<MainData.Area>;
	guangdongRank: MainData.Area[];
	lastUpdateTime: string,
	countryCardData: CardDataProps,
	guangdongCardData: CardDataProps

}
