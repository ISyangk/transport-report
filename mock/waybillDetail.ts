import mockjs from 'mockjs';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /waybill-query-app/waybill/detail': mockjs.mock({
    "data": {
        "modeCode|1": [
            "TPM_AIR",
            "TPM_ROAD",
            "TPM_SEA",
            "TPM_EXPRESS",
        ],
        "mode":"TPM_SEA",
        "id":"29d9716cf2cf21ac4b6dde2b06548871",
        "purchaseOrderNo":"SINX190438726",
        "wayBillNo":"SHZ2595515A",
        "shipper":"INNOLUX CORPORATION",
        "consignee":"INNOLUX INC",
        "originCode":"",
        "origin":"",
        "destinationCode":"",
        "destination":"",
        "etd":null,
        "eta":null,
        "statusCode":"SSC_GOL",
        "status":"Completed",
        "createdTime":null,
        "project":null,
        "serviceProduct":null,
        "orderDate":1554889444,
        "serviceType":"SEL_STD",
        "taxAmount":null,
        "invoiceNo":null,
        "grossWeight":"11395.040000",
        "netWeight":"11395.040000",
        "chargeable":"100.600000",
        "volume":"100.600000",
        "packs":null,
        "goodsValue":null,
        "containerMode":null,
        "vehicleMode":"CTM_FCL",
        "vehicleType":null,
        "shipperInfo":null,
        "consigneeInfo":null,
        "entrustingInfo":null,
        "settlementInfo":null,
        "milestones":[
            {
                "name":"Booking Initiated",
                "code":"SST_BIN",
                "est":null,
                "act":1554833880
            },
            {
                "name":"Arrived",
                "code":"SST_VAR",
                "est":null,
                "act":1556649360
            },
            {
                "name":"Shipment Closed",
                "code":"SST_BCL",
                "est":null,
                "act":1557889680
            },
            {
                "name":"Vehicle Departed",
                "code":"SSC_GOL",
                "est":null,
                "act":1554833880
            },
            {
                "name":"Left Pickup Place",
                "code":"SST_LPP",
                "est":null,
                "act":1554833880
            },
            {
                "name":"Departed",
                "code":"SST_VDP",
                "est":null,
                "act":1555308480
            },
            {
                "name":"At Origin Terminal",
                "code":"SST_POL",
                "est":null,
                "act":1554933960
            },
            {
                "name":"Cargo Delivered",
                "code":"SST_CDL",
                "est":null,
                "act":1557574920
            },
            {
                "name":"Left Final Terminal",
                "code":"SST_LPD",
                "est":null,
                "act":1556760780
            },
            {
                "name":"Vehicle Arrived",
                "code":"SSC_FUD",
                "est":null,
                "act":null
            }
        ],
        // 'milestones|5-7': [{
        //     'act': '@time',
        //     'est': '@time',
        //     'code': "@word",
        //     'name': "@word",
        // }],
        'documents|1-10': [{
            'name': "@word",
            'type': "@word",
            'uploadTime': "@word"
        }],
        'relatedOrganizations|1-5': [{
            'contactNumber': "@word",
            'contactsName': "@word",
            'name': "@word",
            'type': "@word",
        }],
        "routes":[
            {
                "etd":1555365600,
                "atd":1555341420,
                "eta":1556542800,
                "ata":1556578080,
                "modeCode":"TPM_SEA",
                "mode":"TPM_SEA",
                "transportVehicleNo":null,
                "carrier":null
            },
            {
                "etd":1557763200,
                "atd":null,
                "eta":1558368000,
                "ata":null,
                "modeCode":"TPM_RAIL",
                "mode":"TPM_RAIL",
                "transportVehicleNo":null,
                "carrier":null
            }
        ],
    },
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  })
};
