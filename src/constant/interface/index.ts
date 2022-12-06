export interface Sort {
    TODAY_CONFIRM: SortItem,
    HEAL: SortItem,
    SUSPECT: SortItem,
    DEAD: SortItem,
    SEVERE: SortItem,
    STORE_CONFIRM: SortItem,
    INPUT: SortItem,
    TOTAL_CONFIRM:SortItem

}
export interface SortItem {
    KEY: string,
    LABEL: string
}