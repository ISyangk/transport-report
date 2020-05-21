import { Request, Response } from 'express';
import { mock } from 'mockjs';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /user/getUserInfo': mock({
    "data": {
      "userId": "USR_10186",
      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5X2NvZGUiOiJDTiIsImxvY2FsZV9jb2RlIjoiZW5fVVMiLCJ1c2VyX25hbWUiOiJJTS1URVNUMDIiLCJzY29wZSI6WyJmb28iLCJyZWFkIiwid3JpdGUiXSwiYXBwbGljYXRpb25fY29kZSI6InZpc3VhbCIsImV4cCI6MTU3ODU3NjI0MiwidXNlcmFjY291bnRfaWQiOiJVU1JfMTAxODYiLCJqdGkiOiI1OTM4YWZhYS1lYjVkLTQxMzMtOGQ5Mi02NGViMDUyZmYyZWUiLCJncmFudF9hcHBsaWNhdGlvbl9jb2RlcyI6WyJ2aXN1YWwiLCJDUF9URU5BTlQiXSwiY2xpZW50X2lkIjoidmlzdWFsIiwidGVuYW50X2NvZGUiOiJJTk5PTFVYMDEifQ.KKqUQh84e5XxD7K-XfYzY28nPoVjNtrUDKJM9O4nXsYSDA2RFtRLpAX5IzIbxkPRkQpO5CR5RZYtDawLZSfjprF8tJ4jiVdfBll2-mMCTHrv-dQ83Hoy2Ob8rM9KiWCNlCtAHWYa-e4rh_IxBi4XZ3yqaDyC0Kr7eoYGWCxqHI59W6g_veGxzu1LvRRcOQvW1gx7TO49u4RvIbuqOPgIDsEp_ceI38QRQODKjc8N_x451gP1mimdtznSuwt_TqAZAJxJhAUHMmBTKxPfBRBanCARJujZqQ8HmKFzBGZm5PZWYHtvoO2vI109lWyH5itVd4PRPQ4CwZqC5CZDaaLKag",
      "username": "IM-TEST02",
      "organizationId": "ORG10006",
      "organizationName": "INNOLUX",
      "localeCode": "en_US",
      "countryCode": "CN",
      "tenantCode": "INNOLUX01",
      "applicationCode": "visual",
      "code": "IM-TEST02",
      "contactEmail": "chujing@mail.jusdascm.com",
      "contactPhone": null,
      "roles": [
        {
          "id": "ROL10007",
          "roleCode": "R10007",
          "roleName": "基础管理员",
          "type": "SYSTEM",
          "description": "系统角色：基础管理员"
        }
      ],
      "applications": [
        {
          "applicationCode": "CP_TENANT",
          "applicationName": "中台租户",
          "features": [
            {
              "id": "FEA5",
              "code": "org_and_user_manage",
              "name": "组织与员工",
              "operations": [
                {
                  "id": "OPE20",
                  "code": "org_and_user",
                  "name": "组织与员工"
                },
                {
                  "id": "OPE21",
                  "code": "org_architect",
                  "name": "组织架构"
                },
                {
                  "id": "OPE22",
                  "code": "org_search",
                  "name": "组织搜索"
                },
                {
                  "id": "OPE23",
                  "code": "org_add",
                  "name": "新增组织"
                },
                {
                  "id": "OPE24",
                  "code": "org_edit",
                  "name": "编辑组织"
                },
                {
                  "id": "OPE26",
                  "code": "user_query",
                  "name": "查看用户"
                },
                {
                  "id": "OPE27",
                  "code": "user_add",
                  "name": "添加用户"
                },
                {
                  "id": "OPE28",
                  "code": "user_import",
                  "name": "批量导入用户"
                },
                {
                  "id": "OPE29",
                  "code": "user_edit",
                  "name": "编辑用户"
                },
                {
                  "id": "OPE30",
                  "code": "user_reset_password",
                  "name": "重置密码"
                },
                {
                  "id": "OPE31",
                  "code": "user_status",
                  "name": "用户状态管理"
                },
                {
                  "id": "OPE32",
                  "code": "user_detail",
                  "name": "用户详情"
                },
                {
                  "id": "OPE33",
                  "code": "user_opreation_record",
                  "name": "用户操作记录"
                },
                {
                  "id": "OPE25",
                  "code": "org_delete",
                  "name": "删除组织"
                }
              ]
            },
            {
              "id": "FEA7",
              "code": "role_manage",
              "name": "角色管理",
              "operations": [
                {
                  "id": "OPE11",
                  "code": "role_manage",
                  "name": "角色管理"
                },
                {
                  "id": "OPE12",
                  "code": "role_add",
                  "name": "创建角色"
                },
                {
                  "id": "OPE13",
                  "code": "role_edit",
                  "name": "编辑角色"
                },
                {
                  "id": "OPE14",
                  "code": "role_add_permission",
                  "name": "新增配置权限"
                },
                {
                  "id": "OPE15",
                  "code": "role_add_user",
                  "name": "新增分配用户"
                },
                {
                  "id": "OPE16",
                  "code": "role_edit_permission",
                  "name": "编辑配置权限"
                },
                {
                  "id": "OPE17",
                  "code": "role_edit_user",
                  "name": "编辑分配用户"
                },
                {
                  "id": "OPE18",
                  "code": "role_detail",
                  "name": "角色详情"
                },
                {
                  "id": "OPE19",
                  "code": "role_opreation_record",
                  "name": "角色操作记录"
                }
              ]
            },
            {
              "id": "FEA4",
              "code": "org_architect_manage",
              "name": "组织架构管理",
              "operations": [
                {
                  "id": "OPE34",
                  "code": "org_manage",
                  "name": "组织架构管理"
                }
              ]
            }
          ]
        }
      ],
      "userTenant": {
        "tenantName": "INNOLUX",
        "tenantCode": "INNOLUX01"
      }
    },
    "success": true,
    "errorCode": null,
    "errorData": null,
    "message": null
  }),
  'GET /waybill/dictionary/consignee': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/destination': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/mode': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/origin': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/transportation-location': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/shipper': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),
  'GET /waybill/dictionary/status': mock({
    "data|5-10": [
      {
        "code": "@id",
        "description": "@word"
      }
    ],
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),

  'GET /authentication/getToken': mock({
    "data": "@word",
    "errorCode": "string",
    "errorData": {},
    "message": "string",
    "success": true
  }),


};
