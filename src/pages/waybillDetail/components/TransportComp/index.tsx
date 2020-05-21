import React, { useEffect } from 'react';
import { dataState } from '@/models/waybillDetail';
import { ShowTime } from "@/components";
import { Row, Col } from 'antd';
import styles from '../../style.less';
import { formatMessage } from "umi-plugin-react/locale";

interface propsState {
    data?: dataState,
};
const TransportComp: React.FC<propsState> = (props) => {
    const { data }:any = props;
    
    const informationArr:any = {
        project: {
            name: formatMessage({ id: "detail.Transport.Project" }),
            from: null,
        },
        serviceProduct: {
            name: formatMessage({ id: "detail.Transport.Product" }),
            from: null,
        },
        etd: {
            name: formatMessage({ id: "detail.Transport.ETD" }),
            from: null,
            fn: (time:any) => {
                return time ? (<ShowTime text={time} format="YYYY-MM-DD HH:mm" />) : '';
            }
        },
        eta: {
            name: formatMessage({ id: "detail.Transport.ETA" }),
            from: null,
            fn: (time:any) => {
                return time ? (<ShowTime text={time} format="YYYY-MM-DD HH:mm" />) : '';
            }
        },
        orderDate: {
            name: formatMessage({ id: "detail.Transport.OrderDate" }),
            from: null,
            fn: (time:any) => {
                return time ? (<ShowTime text={time} />) : '';
            }
        },
        serviceType: {
            name: formatMessage({ id: "detail.Transport.Service" }),
            from: null,
        },
        containerMode: {
            name: formatMessage({ id: "detail.Transport.Container" }),
            from: ['TPM_ROAD', 'TPM_SEA', 'TPM_RAILWAY'],
        },
        vehicleMode: {
            name: formatMessage({ id: "detail.Transport.VehicleMode" }),
            from: ['TPM_EXPRESS', 'TPM_ROAD'],
        },
        vehicleType: {
            name: formatMessage({ id: "detail.Transport.VehicleType" }),
            from: ['TPM_EXPRESS', 'TPM_ROAD'],
        },
        taxAmount: {
            name: formatMessage({ id: "detail.Transport.Tax" }),
            from: null,
            // from: ['TPM_ROAD', 'TPM_SEA', 'TPM_RAILWAY', 'TPM_AIR'],
        },
    }

    const setImformation = (dataN:any) => {
        const keys = Object.keys(informationArr);
        // 循环keys
        return keys.map((key:string, index:number) => {
            const item = informationArr[key];
            // 如果有from 表示这个字段只有在特定的运输类型下才展示
            if(item.from){
                if(item.from.indexOf(dataN.modeCode) < 0){
                    return '';
                }
            }
            // 显示的值，如果数据中不存在 则为空
            let val = dataN[key] ? dataN[key] : '';
            // 对于类似时间等需要单独处理 则先执行对象中提前写好的处理函数
            if(item.fn){
                val = item.fn(val)
            }
            // console.log('val=>', dataN[key], val);
            return (
                <Col span={3} key={index}>
                    <div className={styles.itemCol}>
                        <div>{item.name}</div>
                        {val}
                    </div>
                </Col>
            )
        })
    }

    return (
        <Row type="flex" className={styles.panelRow} align="top">
            {setImformation(data)}
        </Row>
    );
};

export default TransportComp;
