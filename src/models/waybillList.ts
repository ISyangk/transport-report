import { Effect } from 'dva';
import { Reducer } from 'redux';

import * as api from '@/service/waybillList';

export interface waybillListModelState {
    searchCondition: {
        pagingCondition?: {
            pageIndex?: number,
            pageSize?: number,
        },
        sortConditions?: object,
        waybillCondition: {
            consignee: string,
            destinationCode: string,
            etaFromTo?: string[],
            etdFromTo?: string[],
            modeCode: string,
            originCode: string,
            purchaseOrderNo: string,
            shipper: string,
            statusCode: string,
            wayBillNo: string
        }
    },
    data: {
        pageInfo: {
            currentPageIndex?: number,
            pageSize?: number,
            paged?: boolean,
            totalCount?: number,
            totalPages?: number
        },
        waybills: {
            consignee?: string,
            destination?: string,
            destinationCode?: string,
            eta?: number,
            etd?: number,
            id?: string,
            mode?: string,
            modeCode?: string,
            origin?: string,
            originCode?: string,
            purchaseOrderNo?: string,
            shipper?: string,
            status?: string,
            statusCode?: string,
            wayBillNo?: string
        }[]
    }
}

export interface waybillListModelType {
    namespace: 'waybillList';
    state: waybillListModelState;
    effects: {
        fetch_waybillList: Effect;
        save_searchCondition: Effect;
    };
    reducers: {
        save: Reducer<waybillListModelState>;
    };
}

const waybillList: waybillListModelType = {
    namespace: 'waybillList',

    state: {
        searchCondition: {
            pagingCondition: {
                pageIndex: 1,
                pageSize: 10,
            },
            sortConditions: {
                // turnoverRate: 'descend',
            },
            waybillCondition: {
                consignee: '',
                destinationCode: '',
                etaFromTo: undefined,
                etdFromTo: undefined,
                modeCode: '',
                originCode: '',
                purchaseOrderNo: '',
                shipper: '',
                statusCode: '',
                wayBillNo: ''
            }
        },
        data: {
            pageInfo: {
                currentPageIndex: 0,
                pageSize: 0,
                paged: true,
                totalCount: 0,
                totalPages: 0
            },
            waybills: []
        }
    },

    effects: {
        *fetch_waybillList(_, { call, put, select }) {
            const searchCondition = yield select((state: { waybillList: { searchCondition: any; }; }) => state.waybillList.searchCondition);
            const sorts = searchCondition.sortConditions;
            const sortConditions: { ascending: boolean; propertyName: string; }[] = [];
            Object.keys(sorts).forEach((item) => {
                if (sorts[item]) {
                    sortConditions.push({
                        ascending: sorts[item] === 'ascend',
                        propertyName: item === 'turnoverRate' ? 'tor' : item,
                    });
                }
            });
            const { data } = yield call(api.getWaybillList, { ...searchCondition, sortConditions });
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
                type: 'fetch_waybillList',
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

export default waybillList;
