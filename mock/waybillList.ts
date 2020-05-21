import { Request, Response } from 'express';
import mockjs from 'mockjs';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /waybill-query-app/waybill/search': mockjs.mock({
    "data": {
      "pageInfo": {
        "currentPageIndex|1-10": 1,
        "pageSize": 10,
        "paged": true,
        "totalCount|50-100": 1,
        "totalPages|1-100": 1
      },
      "waybills|2-4": [
        {
          "consignee": "@word",
          "destination": "@word",
          "destinationCode": "@id",
          "eta": "@time",
          "etd": "time",
          "id": "@id",
          "mode|1": [
            "air",
            "road",
            "sea",
            "express",
          ],
          "modeCode": "@word",
          "origin": "@word",
          "originCode": "@id",
          "purchaseOrderNo": "@id",
          "shipper": "string",
          "status": "string",
          "statusCode": "@id",
          "wayBillNo": "@id"
        }
      ]
    },
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  })
};
