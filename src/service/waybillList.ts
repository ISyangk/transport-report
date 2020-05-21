import request from '@/utils/request';
import { transformRangPickerFeild } from "./transformFeilds";
export interface waybillListSearchType {
    pagingCondition?: {
        pageIndex?: number,
        pageSize?: number,
    },
    sortConditions?: object,
    waybillCondition: {
        consignee: string,
        destinationCode: string,
        etaFrom: string,
        etaTo: string,
        etdFrom: string,
        etdTo: string,
        modeCode: string,
        originCode: string,
        purchaseOrderNo: string,
        shipper: string,
        statusCode: string,
        wayBillNo: string
    }
}
export async function getWaybillList(data:any): Promise<any> {
    return request('/waybill/search', {
        method: 'POST',
        data:transformRangPickerFeild(data),
    });
}


