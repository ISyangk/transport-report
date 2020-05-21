import React, { useEffect } from 'react';
import { dataState } from '@/models/waybillDetail';
import { Row, Col } from 'antd';
import styles from '../../style.less';
import { formatMessage } from "umi-plugin-react/locale";

interface propsState {
    data?: dataState,
};
const CargoComp: React.FC<propsState> = (props) => {
    const { data }:any = props;
    return (
        <Row type="flex" className={styles.panelRow} align="top">
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.InvoiceNo" })}</div>
                    {data.invoiceNo}
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.GrossWeight" })}</div>
                    {data.grossWeight}KG
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.NetWeight" })}</div>
                    {data.netWeight}KG
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.Chargeable" })}</div>
                    {data.chargeable}
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.Volume" })}</div>
                    {data.volume}m³
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.Packs" })}</div>
                    {data.packs}{data.packsUnit}
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.itemCol}>
                    <div>{formatMessage({ id: "detail.Cargo.GoodsValue" })}</div>
                    {data.goodsValue}
                </div>
            </Col>
        </Row>
    );
};

export default CargoComp;
