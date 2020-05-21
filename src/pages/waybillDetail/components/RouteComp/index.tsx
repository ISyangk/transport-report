import React, { useEffect } from 'react';
import { RoutesState } from '@/models/waybillDetail';
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import styles from './style.less';
import { formatMessage } from "umi-plugin-react/locale";
import { ShowTransportMode, ShowTime } from "@/components";


interface propsState {
    routes?: RoutesState,
};
const RoutesComp: React.FC<propsState> = ({ routes }: any) => {
    // const { routes }:any = props;
    // console.log('props', routes);
    const columns: ColumnProps<any>[] = [
        {
            title: "#",
            align: 'center',
            dataIndex: "id"
        },
        {
            title: formatMessage({ id: "detail.Route.Title" }),
            align: 'center',
            dataIndex: "destination",
            render: (text, record) => {
                return (
                    <div >{record.origin && record.origin}{record.destination && ` → ${record.destination}`}</div>
                )
            }
        },
        {
            title: formatMessage({ id: "detail.Route.ETD" }),
            align: 'center',
            dataIndex: "etd",
            render: (text, record) => {
                const isLate = ((record.etd && record.atd) && (record.atd > record.etd)) ? true : false;
                return (
                    <div className={styles.tbTime}>
                    <div >{record.etd ? (<ShowTime text={record.etd} format="YYYY-MM-DD HH:mm:ss" />) : ''}</div>
                    <div className={`${isLate && styles.timeLate}`} >{record.atd ? (<ShowTime text={record.atd} format="YYYY-MM-DD HH:mm:ss" />) : ''}</div>
                    </div>
                )
            }
        },
        {
            title: formatMessage({ id: "detail.Route.ETA" }),
            align: 'center',
            dataIndex: "eta",
            render: (text, record) => {
                const isLate = ((record.eta && record.ata) && (record.ata  > record.eta)) ? true : false;
                return (
                    <div className={styles.tbTime}>
                    <div>{record.eta ? (<ShowTime text={record.eta} format="YYYY-MM-DD HH:mm:ss" />) : ''}</div>
                    <div className={`${isLate && styles.timeLate}`}>{record.ata ? (<ShowTime text={record.ata} format="YYYY-MM-DD HH:mm:ss" />) : ''}</div>
                    </div>
                )
            }
        },
        {
            title: formatMessage({ id: "detail.Route.Mode" }),
            align: 'center',
            dataIndex: "modeCode",
            render: text => {
                return (<ShowTransportMode text={text} />)
            }
        },
        {
            title: formatMessage({ id: "detail.Route.TransportNo" }),
            align: 'center',
            dataIndex: "transportVehicleNo"
        },
        {
            title: formatMessage({ id: "detail.Route.Carrier" }),
            align: 'center',
            dataIndex: "carrier"
        }
    ];
    const routesArr = routes.map((item:any, index:number) => {
        return {
            ...item,
            id: index+1,
        }
    })
    // if(!routesArr || routesArr.length === 0){
    //     return '';
    // }
    return (
        <div className={styles.routeComp}>
            <Table
                rowClassName={styles.rowClass}
                columns={columns}
                pagination={false}
                dataSource={routesArr}
                rowKey='id'
            />
        </div>
    );
};

export default RoutesComp;
// export default connect((waybillDetail) => ({
//     milestone: waybillDetail,
// }))(Milestones);
