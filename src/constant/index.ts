import { Sort, SortItem } from './interface/index';

export const SortEnum: Sort = {
    TOTAL_CONFIRM: {
        KEY: 'toal_confirm',
        LABEL: '累计确诊',
    },
    TODAY_CONFIRM: {
        KEY: 'today_confirm',
        LABEL: '新增确诊',
    },
    SUSPECT: {
        KEY: 'suspect',
        LABEL: '疑似',
    },
    HEAL: {
        KEY: 'heal',
        LABEL: '累计治愈',
    },
    DEAD: {
        KEY: 'dead',
        LABEL: '累计死亡',
    },
    SEVERE: {
        KEY: 'severe',
        LABEL: '严重',
    },
    STORE_CONFIRM: {
        KEY: 'storeConfirm',
        LABEL: '累计确诊',
    },
    INPUT: {
        KEY: 'input',
        LABEL: '境外输入',
    },


}

export const SortList: SortItem[] = [SortEnum.TOTAL_CONFIRM,SortEnum.TODAY_CONFIRM, SortEnum.HEAL, SortEnum.SUSPECT, SortEnum.DEAD,
SortEnum.SEVERE, SortEnum.STORE_CONFIRM, SortEnum.INPUT]
export const EchartColors: string[] = [
    '#c0392b', '#d35400', '#f39c12', '#e1b12c', '#6F1E51',
    '#8e44ad', '#2980b9', '#40739e', '#16a085', '#27ae60'
]