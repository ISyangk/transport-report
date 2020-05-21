import request from '@/utils/request';

export interface detailId {
    id?: String,
}
export async function getWaybillDetail(data: detailId): Promise<any> {
    return request(`/waybill/detail/${data.id}`, {
        method: 'GET',
    });
}

// export async function getWaybillDetail(data: detailId): Promise<any> {
//     return request('/waybill-query-app/waybill/detail', {
//         method: 'POST',
//         data,
//     });
// }
