import { Effect } from "dva";
import { Reducer } from "redux";
import * as api from "@/service/global";
import { getLocale, formatMessage } from "umi-plugin-react/locale";

export type dataDictionaryType = {
    code: string;
    description: string;
}[];

export type applicationList = {
    applicationCode: string;
    applicationName: string;
}[]

export type localeType = "en-US" | "zh-CN" | "zh";

export interface globalModelState {
    consignee: dataDictionaryType;
    destination: {
        code: string;
        description: string;
    }[];
    mode: dataDictionaryType;
    origin: {
        code: string;
        description: string;
    }[];
    transportationLocation: {
        code: string;
        description: string;
    }[];
    shipper: dataDictionaryType;
    status: dataDictionaryType;
    userInfo: any;
    locale: localeType;
    applicationList: applicationList;
}

export interface waybillListModelType {
    namespace: "global";
    state: globalModelState;
    effects: {
        fetch_consignee: Effect;
        fetch_destination: Effect;
        fetch_mode: Effect;
        fetch_origin: Effect;
        fetch_shipper: Effect;
        fetch_status: Effect;
        fetch_userInfo: Effect;
        fetch_applicationList: Effect;
        fetch_transportationLocation: Effect;
    };
    reducers: {
        save: Reducer<globalModelState>;
    };
}

const mode = [
    {
        description: "Road",
        code: "TPM_ROAD"
    },
    {
        description: "Sea",
        code: "TPM_SEA"
    },
    {
        description: "Express",
        code: "TPM_EXPRESS"
    },
    {
        description: "Air",
        code: "TPM_AIR"
    }
];

const status = [
    {
        description: "Origin Booking",
        code: "SST_BIN"
    },
    {
        description: "Origin Transportation",
        code: "SST_LPP"
    },
    {
        description: "Waiting for Departure",
        code: "SST_POL"
    },
    {
        description: "In Transit",
        code: "SST_VDP"
    },
    {
        description: "Arrived at Terminal of discharge",
        code: "SST_VAR"
    },
    {
        description: "Transport to final address",
        code: "SST_LPD"
    },
    {
        description: "Empty CNTR to be returned",
        code: "SST_CDL"
    },
    {
        description: "Completed",
        code: "SST_BCL"
    }
];

const global: waybillListModelType = {
    namespace: "global",
    state: {
        consignee: [],
        destination: [],
        mode: mode,
        origin: [],
        shipper: [],
        status: status,
        transportationLocation: [],
        userInfo: {},
        locale:( getLocale() as localeType === "zh-CN" || getLocale() as localeType === "zh") ? "zh-CN" : "en-US",
        applicationList: []
    },

    effects: {
        *fetch_userInfo(_, { call, put, select }) {
            const { data } = yield call(api.getUserInfo);
            yield put({
                type: "save",
                payload: { userInfo: data }
            });
        },
        *fetch_applicationList(_, { call, put, select }) {
            const { data } = yield call(api.getApplication);
            yield put({
                type: "save",
                payload: { applicationList: data }
            });
        },
        *fetch_consignee(_, { call, put, select }) {
            const { data } = yield call(api.getConsignee);
            yield put({
                type: "save",
                payload: { consignee: data }
            });
        },
        *fetch_destination(_, { call, put, select }) {
            const { data } = yield call(api.getDestination);
            yield put({
                type: "save",
                payload: { destination: data }
            });
        },
        *fetch_mode(_, { call, put, select }) {
            const { data } = yield call(api.getMode);
            yield put({
                type: "save",
                payload: { mode: data }
            });
        },
        *fetch_origin(_, { call, put, select }) {
            const { data } = yield call(api.getOrigin);
            yield put({
                type: "save",
                payload: { origin: data }
            });
        },
        *fetch_shipper(_, { call, put, select }) {
            const { data } = yield call(api.getShipper);
            yield put({
                type: "save",
                payload: { shipper: data }
            });
        },
        *fetch_status(_, { call, put, select }) {
            const { data } = yield call(api.getStatus);
            yield put({
                type: "save",
                payload: { status: data }
            });
        },
        *fetch_transportationLocation({ payload }, { call, put, select }) {
            const { data } = yield call(api.getTransportationLocation, {
                name: payload
            });
            yield put({
                type: "save",
                payload: { transportationLocation: data }
            });
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};

export default global;
