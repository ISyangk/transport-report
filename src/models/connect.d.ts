import { AnyAction } from "redux";
import { RouterTypes, Route } from "umi";
import { Dispatch } from "react";
import { waybillListModelState } from "./waybillList";
import { waybillDetailModelState } from "./waybillDetail";
export { waybillDetailModelState };
import { globalModelState, dataDictionaryType, localeType } from "./global";
export {
    waybillListModelState,
    globalModelState,
    dataDictionaryType,
    localeType
};

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
        waybillList?: boolean;
    };
}

export interface ConnectState {
    loading: Loading;
    waybillList: waybillListModelState;
    waybillDetail: waybillDetailModelState;
    global: globalModelState;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
    dispatch: Dispatch<AnyAction>;
}
