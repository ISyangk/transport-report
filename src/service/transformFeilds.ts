import moment from "moment";
// export interface transformRangPickerFeildType {
//     etaFromTo?: string[];
//     etdFromTo?: string[];
//     [propName: string]: any;
// }

export const transformRangPickerFeild = ({ waybillCondition, ...args }: any) => {
    const { etaFromTo, etdFromTo, ...argss } = waybillCondition
    let etaFrom = etaFromTo && etaFromTo.length ? moment(etaFromTo[0]).set({ 'hour': 0, 'minute': 0, 'second': 0 }).valueOf() : undefined
    let etaTo = etaFromTo && etaFromTo.length ? moment(etaFromTo[1]).set({ 'hour': 23, 'minute': 59, 'second': 59 }).valueOf() : undefined
    let etdFrom = etdFromTo && etdFromTo.length ? moment(etdFromTo[0]).set({ 'hour': 0, 'minute': 0, 'second': 0 }).valueOf() : undefined
    let etdTo = etdFromTo && etdFromTo.length ? moment(etdFromTo[1]).set({ 'hour': 23, 'minute': 59, 'second': 59 }).valueOf() : undefined
    return { ...args, waybillCondition: { ...argss, etaFrom, etaTo, etdFrom, etdTo } }
}