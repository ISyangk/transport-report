import request from '@/utils/request';


// 获取用户信息
export async function getUserInfo(): Promise<any> {
    return request('/user/getUserInfo', {
        method: 'POST',
        prefix: undefined
    });
}

// 获取应用权限
export async function getApplication(): Promise<any> {
    return request('/usercenter-service/user-identity/application', {
        method: 'GET',
        prefix: undefined
    });
}

// 运输地点
export async function getTransportationLocation(params: any): Promise<any> {
    return request('/waybill/dictionary/transportation-location', {
        method: 'GET',
        params
    });
}

// 收货人
export async function getConsignee(): Promise<any> {
    return request('/waybill/dictionary/consignee', {
        method: 'GET',
    });
}

// 目的地
export async function getDestination(): Promise<any> {
    return request('/waybill/dictionary/destination', {
        method: 'GET',
    });
}


// 运载模式
export async function getMode(): Promise<any> {
    return request('/waybill/dictionary/mode', {
        method: 'GET',
    });
}


// 出发地
export async function getOrigin(): Promise<any> {
    return request('/waybill/dictionary/origin', {
        method: 'GET',
    });
}

// 发货人
export async function getShipper(): Promise<any> {
    return request('/waybill/dictionary/shipper', {
        method: 'GET',
    });
}

// 运输状态
export async function getStatus(): Promise<any> {
    return request('/waybill/dictionary/status', {
        method: 'GET',
    });
}



