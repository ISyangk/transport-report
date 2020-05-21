import { Effect } from 'dva';
import { Reducer } from 'redux';

import * as api from '@/service/waybillDetail';

export interface MilestonesState {
    act?: Number,
    est?: Number,
    code?: String,
    name?: String,
}[];

export interface RoutesState {
    ata?: Number,
    atd?: Number,
    eta?: Number,
    etd?: Number,
    carrier?: String,
    mode?: String,
    modeCode?: String,
    transportVehicleNo?: String,
    origin?: String,
    destination?: String,
}[];

export interface DocumentsState {
    name?: String,
    type?: String,
    uploadTime?: String
}[];

export interface dataState {
    chargeable?: string,
    consignee?: string,
    destination?: string,
    containerMode?: String,
    destinationCode?: string,
    eta?: number,
    etd?: number,
    goodsValue?: string,
    grossWeight?: string,
    id?: string,
    invoiceNo?: string,
    mode?: string,
    modeCode?: string,
    netWeight?: string,
    orderDate?: number,
    origin?: string,
    originCode?: string,
    packs?: string,
    packsUnit?: string,
    project?: string,
    purchaseOrderNo?: string,
    serviceProduct?: string,
    serviceType?: string,
    shipper?: string,
    status?: string,
    statusCode?: string,
    taxAmount?: string,
    vehicleMode?: string,
    vehicleType?: string,
    volume?: string,
    wayBillNo?: string,
    shipperInfo?: any,
    settlementInfo?: any,
    entrustingInfo?: any,
    consigneeInfo?: any,

    milestones?: MilestonesState,
    documents?: DocumentsState,
    relatedOrganizations?: RelatedOrganizationsState,
    routes?: RoutesState
}

export interface waybillDetailModelState {
    id: String,
    data: dataState
}

export interface RelatedOrganizationsState {
    contactNumber?: String,
    contactsName?: String,
    name?: String,
    type?: String,
}[];

export interface waybillDetailModelType {
    namespace: 'waybillDetail';
    state: waybillDetailModelState;
    effects: {
        fetch_waybillDetail: Effect;
        save_searchCondition: Effect;
    };
    reducers: {
        save: Reducer<waybillDetailModelState>;
    };
}

const waybillDetail: waybillDetailModelType = {
    namespace: 'waybillDetail',

    state: {
        id: '',
        data:{
            chargeable: '',
            consignee: '',
            destination: '',
            containerMode: '',
            destinationCode: '',
            eta: 0,
            etd: 0,
            goodsValue: '',
            grossWeight: '',
            id: '',
            invoiceNo: '',
            mode: '',
            modeCode: '',
            netWeight: '',
            orderDate: 0,
            origin: '',
            originCode: '',
            packs: '',
            packsUnit: '',
            project: '',
            purchaseOrderNo: '',
            serviceProduct: '',
            serviceType: '',
            shipper: '',
            status: '',
            statusCode: '',
            taxAmount: '',
            vehicleMode: '',
            vehicleType: '',
            volume: '',
            wayBillNo: '',
            shipperInfo: {},
            settlementInfo: {},
            entrustingInfo: {},
            consigneeInfo: {},
            milestones: [],
            documents: [],
            relatedOrganizations: [],
            routes: []
        },
    },

    effects: {
        *fetch_waybillDetail({payload}, { call, put }) {
            const { id } = payload;
            const { data } = yield call(api.getWaybillDetail, {id});
            yield put({
                type: 'save',
                payload: { data },
            });
        },
        *save_searchCondition({ payload }, { put }) {
            yield put({
                type: 'save',
                payload,
            });
            yield put({
                type: 'fetch_materialsList',
            });
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload,
            };
        },
    },
};

export default waybillDetail;
