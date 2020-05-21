export const similarApi = {
    ct: '/ct/#/app',
    shipment: '/transport/#/app',
    inventory: '/inventory/#/app',
};

const { cfgType } = window.jusdaBaseConfig;
const HOSTARR:any = {
    'dev': 'https://visualsit.sccpcloud.com',
    'sit': 'https://visualsit.sccpcloud.com',
    'uat': 'https://visualuat.sccpcloud.com',
    'prod': 'https://visual.sccpcloud.com',
};
const HOSTURL = HOSTARR[cfgType] ? HOSTARR[cfgType] : HOSTARR['sit'];
/**
 * tabel序号
 * @param {Number} index 当前行 索引
 * @param {Number} current
 * @param {Number} pageSize
 * return Number
 */
export function goShipDetail(opt:Object) {
    const parmas = {
        id: null,
        isShowChat: '0',
        open: true,
        ...opt,
    };
    if (!parmas.id) { return; }
    const url = `${HOSTURL}${similarApi.shipment}/shipment/shipmentDetail/${parmas.id}/${parmas.isShowChat}`;
    if (parmas.open) {
        window.open(url);
    } else {
        window.location.href = url;
    }
    // history.push(`/app/shipment/shipmentDetail/${record.id}/0`);
}
