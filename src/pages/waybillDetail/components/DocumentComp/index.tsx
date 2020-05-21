import React, { useState } from 'react';
import { DocumentsState } from '@/models/waybillDetail';
import { Table, Icon } from "antd";
import { ColumnProps } from "antd/lib/table";
import styles from './style.less';
import { formatMessage } from "umi-plugin-react/locale";

import { ShowTime } from "@/components";
import ShowFileMode from './ShowFileMode';

interface propsState {
    documents?: DocumentsState,
};
const RoutesComp: React.FC<propsState> = (props) => {
    const { documents }:any = props;
    const columns: ColumnProps<any>[] = [
        {
            title: "#",
            align: 'center',
            dataIndex: "docuId",
            render: (text, record) => (
                <div>{record.docuId}</div>
            )
            // dataIndex: "id"
        },
        {
            title: formatMessage({ id: "detail.Documents.Name" }),
            align: 'center',
            dataIndex: "name"
        },
        {
            title: formatMessage({ id: "detail.Documents.Type" }),
            align: 'center',
            dataIndex: "type"
        },
        {
            title: formatMessage({ id: "detail.Documents.UpTime" }),
            align: 'center',
            dataIndex: "uploadTime",
            render: text => (
                <div><ShowTime text={text} format="YYYY-MM-DD HH:mm:ss" /></div>
            )
        },
        {
            title: formatMessage({ id: "detail.Documents.Option" }),
            align: 'center',
            dataIndex: "resourceCode",
            render: (text, record) => {
                return <ShowFileMode resourceCode={text} name={record.name}/>;
            }
        }
    ];
    const documentsArr = documents.map((item:any, index:number) => {
        return {
            ...item,
            docuId: index+1,
        }
    })
    // if(!documentsArr || documentsArr.length === 0){
    //     return '';
    // }
    return (
        <div className={styles.documentComp}>
            <Table
                rowClassName={styles.rowClass}
                columns={columns}
                pagination={false}
                dataSource={documentsArr}
                rowKey='docuId'
            />
        </div>
    );
};

export default RoutesComp;
