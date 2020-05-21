import React, { useState, useEffect } from "react";
import styles from "./home.less";
import { formatMessage } from "umi-plugin-react/locale";
import { useHistory } from "dva/router";
import { useSelector } from "dva";
import { ConnectState } from "@/models/connect";
import request from "@/utils/request";
import TokenCookie from "@/utils/TokenCookie";
import { modalInfo } from "@/components";
import { checkApplication } from "@/utils/appFn";
import { appObj } from "@/utils/constant";
import QueueAnim from "rc-queue-anim";

const { cfgType } = window.jusdaBaseConfig;

const applicationPaths = {
    shipmentQuery: {
        dev:
            "https://dev.sccpcloud.com/commerce/waybill-query/#/App/waybillList",
        sit:
            "https://visualsit.sccpcloud.com/commerce/waybill-query/#/App/waybillList",
        uat:
            "https://visualuat.sccpcloud.com/commerce/waybill-query/#/App/waybillList",
        prod: "https://www.sccpcloud.com/visual/#/App/waybillList"
    },
    shipmentBooking: {
        dev: "https://j1.sccpcloud.com/html/desk",
        sit: "https://j1.sccpcloud.com/html/desk",
        uat: "https://j2.sccpcloud.com/html/desk",
        prod: "https://cs.sccpcloud.com/html/desk"
    },
    inventoryQuery: {
        dev: "https://dev.sccpcloud.com/inventory-owner/#/app/home",
        sit: "https://visualsit.sccpcloud.com/inventory-owner/#/app/home",
        uat: "https://visualuat.sccpcloud.com/inventory-owner/#/app/home",
        prod: "https://visual.sccpcloud.com/inventory-owner/#/app/home"
    },

    // 请求地址
    oldhome: {
        dev: "https://j1.sccpcloud.com/jusda-business/users/getLoginInfo",
        sit: "https://j1.sccpcloud.com/jusda-business/users/getLoginInfo",
        uat: "https://j2.sccpcloud.com/jusda-business/users/getLoginInfo",
        prod: "https://cs.sccpcloud.com/jusda-business/users/getLoginInfo"
    }
};

const applicationPermissions = [
    {
        name: "Visual_transport_query",
        id: "home.tab.Shipment Query",
        path: applicationPaths.shipmentQuery[`${cfgType}`],
        notPermission: true
    },
    {
        name: "Visual_transport_order",
        id: "home.tab.Shipment Booking",
        path: applicationPaths.shipmentBooking[`${cfgType}`],
        subTab: [
            "home.tab.ShipmentBooking.road",
            "home.tab.ShipmentBooking.express.doc",
            "home.tab.ShipmentBooking.express.pkg",
            "home.tab.ShipmentBooking.sea",
            "home.tab.ShipmentBooking.air"
        ],
        notPermission: true
    },
    {
        name: "Visual_inventory_query",
        id: "home.tab.Inventory Query",
        path: applicationPaths.inventoryQuery[`${cfgType}`],
        notPermission: true
    },
    {
        name: "Visual_report",
        id: "home.tab.Reports",
        path: null,
        notOpened: true
    }
];

export default () => {
    const [applicationPathsState, setapplicationPathsState] = useState(
        applicationPermissions
    );
    const applicationList = useSelector(
        (state: ConnectState) => state.global.applicationList)

    const [show, setShow] = useState(false);

    const { push } = useHistory();
    const handleClick = (
        notPermission: boolean,
        notOpened: boolean,
        path: string | null,
        name: string
    ) => {
        if (notOpened) {
            return;
        }
        if (notOpened || notPermission) {
            return modalInfo(
                formatMessage({
                    id: notOpened
                        ? "global.message.Not opened"
                        : "global.message.not subscribed"
                })
            );
        }
        if (name === "Visual_transport_order") {
            request(applicationPaths.oldhome[`${cfgType}`], {
                method: "POST",
                data: { tokenMessage: TokenCookie.get() },
                prefix: undefined,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                requestType: "form"
            })
                .then(res => {
                    if (res.success === true) {
                        return path && window.open(path);
                    }
                })
                .catch(e => {
                    return path && window.open(path);
                });
        } else {
            path && window.open(path);
        }
    };

    const handleSubClick = (index: number, notPermission: boolean) => {
        const path = {
            dev: [
                "https://j2.sccpcloud.com/html/test/landTransportOrderAddNew",
                "https://j2.sccpcloud.com/html/test/expTransportOrderAddNew?method=ADD&type=Package",
                "https://j2.sccpcloud.com/html/sea/seaTransportOrderAdd",
                "https://j2.sccpcloud.com/html/aviation/aviTransportOrderAddNew"
            ],
            sit: [
                "https://j2.sccpcloud.com/html/test/landTransportOrderAddNew",
                "https://j2.sccpcloud.com/html/test/expTransportOrderAddNew?method=ADD&type=Package",
                "https://j2.sccpcloud.com/html/sea/seaTransportOrderAdd",
                "https://j2.sccpcloud.com/html/aviation/aviTransportOrderAddNew"
            ],
            uat: [
                "https://j2.sccpcloud.com/html/test/landTransportOrderAddNew",
                "https://j2.sccpcloud.com/html/express/expTransportOrderAddNew?method=ADD&type=Document",
                "https://j2.sccpcloud.com/html/test/expTransportOrderAddNew?method=ADD&type=Package",
                "https://j2.sccpcloud.com/html/sea/seaTransportOrderAdd",
                "https://j2.sccpcloud.com/html/aviation/aviTransportOrderAddNew"
            ],
            prod: [
                "https://cs.sccpcloud.com/html/test/landTransportOrderAddNew",
                "https://cs.sccpcloud.com/html/express/expTransportOrderAddNew?method=ADD&type=Document",
                "https://cs.sccpcloud.com/html/test/expTransportOrderAddNew?method=ADD&type=Package",
                "https://cs.sccpcloud.com/html/sea/seaTransportOrderAdd",
                "https://cs.sccpcloud.com/html/aviation/aviTransportOrderAddNew"
            ]
        };
        handleClick(
            notPermission,
            false,
            path[`${cfgType}`][index],
            "Visual_transport_order"
        );
    };

    const getSubTab = (subTab: string[], notPermission: boolean) => {
        return subTab.map((item, index) => {
            return (
                <a
                    key={item}
                    className={styles.subTabChild}
                    onClick={() => {
                        handleSubClick(index, notPermission);
                    }}
                >
                    <div className={styles.subTabChildBg}></div>
                    <div className={styles.text}>
                        {formatMessage({
                            id: item
                        })}
                    </div>
                </a>
            );
        });
    };

    useEffect(() => {
        const aprs = [...applicationPathsState];
        if(checkApplication(applicationList, appObj.vsTaptQy)) {
            aprs[0].notPermission = false;
        }
        if(checkApplication(applicationList, appObj.vsTaptOrder)) {
            aprs[1].notPermission = false;
        }
        if(checkApplication(applicationList, appObj.visual_inventory_vendor)) {
            aprs[2].notPermission = false;
        }
        setapplicationPathsState(aprs);
    }, [applicationList]);

    return (
        <div className={styles.homeWrap}>
            <ul>
                {applicationPathsState.map(
                    (
                        {
                            name,
                            notPermission = false,
                            notOpened = false,
                            id,
                            path,
                            subTab
                        },
                        index
                    ) => (
                        <li
                            key={index}
                            className={
                                notOpened ? styles.functionUpgrading : undefined
                            }
                        >
                            <a
                                className={styles.tabBg}
                                onMouseOver={() => {
                                    index === 1 && setShow(true);
                                }}
                                onMouseLeave={() => {
                                    index === 1 && setShow(false);
                                }}
                                onClick={() => {
                                    index !== 1 &&
                                        handleClick(
                                            notPermission,
                                            notOpened,
                                            path,
                                            name
                                        );
                                }}
                            >
                                {notOpened ? (
                                    <span className={styles.disabled}>
                                        {formatMessage({
                                            id: notOpened
                                                ? "global.message.Not opened"
                                                : "global.message.not subscribed"
                                        })}
                                        ...
                                    </span>
                                ) : null}
                                {formatMessage({
                                    id
                                })}
                                {subTab && subTab.length ? (
                                    <QueueAnim
                                        animConfig={[
                                            { opacity: [1, 0] },
                                            { opacity: [1, 0] }
                                        ]}
                                    >
                                        {show
                                            ? [
                                                  <div
                                                      className={
                                                          styles.subTabWrap
                                                      }
                                                      key="a"
                                                  >
                                                      {getSubTab(
                                                          subTab,
                                                          notPermission
                                                      )}
                                                  </div>,
                                                  <div
                                                      className={
                                                          styles.subTabWrap
                                                      }
                                                      key="b"
                                                  >
                                                      {getSubTab(
                                                          subTab,
                                                          notPermission
                                                      )}
                                                  </div>
                                              ]
                                            : null}
                                    </QueueAnim>
                                ) : null}
                            </a>{" "}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};
