import {CardItem} from '@/components/z-card-data/typing'


/**
 * @description 获取当前时间
 * @return string
 */
export function getTimeState() {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 判断当前时间段
    if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
    if (hours >= 10 && hours <= 14) return `中午好 🌞`;
    if (hours >= 14 && hours <= 18) return `下午好 🌞`;
    if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
    if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}
/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
    return arr.reduce((pre: any, current: any) => {
        let flatArr = [...pre, current];
        if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
        return flatArr;
    }, []);
}

/**
 *获取数组中最大的前N位数组
 *
 * @export
 * @template 
 * @param {T[]} arr 数组
 * @param {(o: T) => any} func 必须返回一个字段类型
 * @param {number} [count=10] 取前几位，默认前十
 * @return {*}  {T[]}
 */
export function getMaxArr<T extends { echartValue?: number }>(arr: T[], func: (o: T) => any, count: number = 10): T[] {
    //建个临时数组存前10的数据
    let _arr = new Array();
    arr.forEach(item => {
        if (_arr.length == 0) {
            // 第一次进来的时候直接插入
            item.echartValue = func(item)
            _arr.push(item)
        } else if (_arr.length < count) {
            item.echartValue = func(item)
            // 数组长度小于10的时候
            const _insert_index = _arr.findIndex(_val => {
                return func(item) > func(_val)
            })
            if (_insert_index != -1) {
                // 如果当前项比_arr里面的值大，则在该值前插入
                _arr.splice(_insert_index, 0, item)
            } else {
                // 如果当前项没有比_arr里面的值大，则最后插入
                _arr.push(item)
            }
        } else if (_arr.length == count) {
            const _insert_index = _arr.findIndex(_val => {
                return func(item) > func(_val)
            })
            if (_insert_index != -1) {
                item.echartValue = func(item)
                _arr.splice(_insert_index, 0, item)
                _arr.pop()
            }

        }
    })
    return _arr
}



/**
 *向card-data组件中添加数据的方法
 *
 * @export
 * @param {Partial<MainData.ChinaTotal>} arr
 * @param {string} title
 * @param {keyof MainData.Base} field
 * @param {string} color
 * @return {*}  {CardItem}
 */
export function addCardData(arr: Partial<MainData.ChinaTotal>, title: string, field: keyof MainData.Base, color: string): CardItem {
    return {
        title: title,
        total: arr.total && arr.total[field],
        today: arr.today && arr.today[field],
        color: color
    }
}
