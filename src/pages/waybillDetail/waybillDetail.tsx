import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { ConnectState, ConnectProps, Loading, waybillDetailModelState } from '@/models/connect';
import styles from './style.less';
import { goShipDetail } from '@/utils/routeFn';
import { formatMessage } from "umi-plugin-react/locale";

import Milestones from './components/Milestones';
import RouteComp from './components/RouteComp';
import DocumentComp from './components/DocumentComp';
import PanelItem from './components/PanelItem';

import TransportComp from './components/TransportComp';
import CargoComp from './components/CargoComp';

interface InfoProps extends ConnectProps {
    waybillDetail: waybillDetailModelState
    loading: Loading,
}
const WaybillDetail: React.FC<InfoProps> = ({
    waybillDetail: {
        data,
    },
    dispatch,
    loading: { effects },
    match,
}) => {
    useEffect(() => {
        const { params: { id } }:any = match;
        dispatch({
            type: 'waybillDetail/fetch_waybillDetail',
            payload: {id: id}
        });
    }, []);
    

    return (
        <div className={styles.waybillDetailContainer}>
            <div className={styles.wayHead}>
                <Milestones data={data || {}} />
                {(data.origin || data.destination) && (
                    <div className={styles.mileTitle}>
                        {data.origin} → {data.destination}
                    </div>
                )}
            </div>
            <div className={styles.wayBody}>
                <div className={styles.bodyTit}>
                    <div>
                        <div className={styles.titItem}>{formatMessage({ id: "detail.Head.PONO" })}：<a  onClick={() => {goShipDetail({ id: data.id || '' })}}>{data.purchaseOrderNo}</a></div>
                        <div className={styles.titItem}>{formatMessage({ id: "detail.Head.Waybill" })}：<a  onClick={() => {goShipDetail({ id: data.id || '' })}}>{data.wayBillNo}</a></div>
                        <div className={styles.titItem}>{formatMessage({ id: "detail.Head.Mode" })}：<span>{data.mode}</span></div>
                        <div className={styles.titItem}>{formatMessage({ id: "detail.Head.Status" })}：<span>{data.status}</span></div>
                    </div>

                    <div className={styles.goRoute}>
                        <img src={require('@/assets/icon/icon_1.png')} alt=""/>
                        <a onClick={() => {goShipDetail({ id: data.id || '' })}}> {formatMessage({ id: "detail.Head.ShowTrace" })}</a>
                    </div>
                </div>
                <div className={styles.panelBox} style={{marginBottom: '10px'}}>
                    <div className={styles.panelHead}>
                        <img src={require('@/assets/icon/icon_2.png')} alt=""/>
                        {formatMessage({ id: "detail.Basic.Information" })}
                    </div>
                    <div className={styles.panelBody}>
                    <Row gutter={20} className={styles.panelRow} align="top">
                        <Col span={6}>
                            <PanelItem position={formatMessage({ id: "detail.Basic.Shipper" })} info={data.shipperInfo || null} />
                        </Col>
                        <Col span={6}>
                            <PanelItem position={formatMessage({ id: "detail.Basic.Consignee" })} info={data.consigneeInfo || null} />
                        </Col>
                        <Col span={6}>
                            <PanelItem position={formatMessage({ id: "detail.Basic.Consignor" })} info={data.entrustingInfo || null} />
                        </Col>
                        <Col span={6}>
                            <PanelItem position={formatMessage({ id: "detail.Basic.SettlementParty" })} info={data.settlementInfo || null} />
                        </Col>
                    </Row>
                    </div>
                </div>
                <div className={styles.panelBox}>
                    <div className={styles.panelHead}>
                        <img src={require('@/assets/icon/icon_3.png')} alt=""/>
                        {formatMessage({ id: "detail.Transport.Information" })}
                    </div>
                    <div className={styles.panelBody}>
                        <TransportComp data={data}/>
                    </div>
                </div>
                <div className={styles.panelBox}>
                    <div className={styles.panelHead}>
                        <img src={require('@/assets/icon/icon_4.png')} alt=""/>
                        {formatMessage({ id: "detail.Cargo.Information" })}
                    </div>
                    <div className={styles.panelBody}>
                        <CargoComp data={data}/>
                    </div>
                </div>

                <div className={styles.panelBox}>
                    <div className={styles.panelHead}>
                        <img src={require('@/assets/icon/icon_5.png')} alt=""/>
                        {formatMessage({ id: "detail.Route.Title" })}
                    </div>
                    <div className={styles.panelBody}>
                        <RouteComp routes={data.routes} />
                    </div>
                </div>
                {/* {(data.documents && data.documents.length) ? ( */}
                <div className={styles.panelBox}>
                    <div className={styles.panelHead}>
                        <img src={require('@/assets/icon/icon_6.png')} alt=""/>
                        {formatMessage({ id: "detail.Documents.Title" })}
                    </div>
                    <div className={styles.panelBody}>
                        <DocumentComp documents={data.documents} />
                    </div>
                </div>
                {/* ) : null} */}
            </div>
        </div>
    );
};

export default connect(({
    waybillDetail,
    loading,
}: ConnectState) => ({
    waybillDetail,
    loading,
}))(WaybillDetail);
