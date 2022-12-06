declare namespace MainData {
    interface ResData {
        chinaTotal: ChinaTotal
        chinaDayList: chinaDay[]
        lastUpdateTime: string
        overseaLastUpdateTime: string
        areaTree: Area[]
    }

    interface ChinaTotal {
        today: Base;
        total: Base;
        extData: ExtData;
    }
    interface Area {
        today: Base
        total: Base
        name: string
        id: string
        lastUpdateTime: string
        children: Area[]
        extData: any,
        echartValue?: number

    }
    interface chinaDay {
        date: string,
        extData: any,
        lastUpdateTime: string,
        today: Base,
        Total: Base
    }

    interface ExtData {
        noSymptom: number;
        incrNoSymptom: number;
    }


    interface Base {
        confirm?: number;
        suspect?: any;
        heal?: number;
        dead?: number;
        severe?: any;
        storeConfirm?: number;
        input?: number;
    }
}

