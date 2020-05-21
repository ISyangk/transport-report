import React, { useEffect } from "react";
import { connect } from "dva";
import { Table } from "antd";
import {
    ConnectState,
    ConnectProps,
    Loading,
    waybillListModelState
} from "@/models/connect";
import { TableEventListeners, ColumnProps } from "antd/lib/table";
import SearchConditionForm from "./SearchConditionForm";
import { ShowTransportMode, ShowTime } from "@/components";
import styles from "./waybillList.less";
import { formatMessage } from "umi-plugin-react/locale";

interface WaybillListProps extends ConnectProps {
    waybillList: waybillListModelState;
    loading: Loading;
}

const WaybillList: React.FC<WaybillListProps> = ({
    waybillList: {
        searchCondition: { sortConditions, waybillCondition },
        data: {
            pageInfo: { currentPageIndex, totalCount },
            waybills
        }
    },
    dispatch,
    loading: { effects }
}) => {
    const columns: ColumnProps<any>[] = [
        {
            title: formatMessage({ id: "list.table.head.PO NO." }),
            dataIndex: "purchaseOrderNo"
        },
        {
            title: formatMessage({ id: "list.table.head.Waybill NO." }),
            dataIndex: "wayBillNo"
        },
        {
            title: formatMessage({ id: "list.table.head.Shipper" }),
            dataIndex: "shipper"
        },
        {
            title: formatMessage({ id: "list.table.head.Consignee" }),
            dataIndex: "consignee"
        },
        {
            title: formatMessage({ id: "list.table.head.Mode" }),
            dataIndex: "mode",
            render: (text, record) => {
                return <ShowTransportMode text={record.modeCode} />;
            }
        },
        {
            title: formatMessage({ id: "list.table.head.Origin" }),
            dataIndex: "origin"
        },
        {
            title: formatMessage({ id: "list.table.head.Destination" }),
            dataIndex: "destination"
        },
        {
            title: formatMessage({ id: "list.table.head.ETD" }),
            dataIndex: "etd",
            render: text => {
                return <ShowTime text={text} />;
            }
        },
        {
            title: formatMessage({ id: "list.table.head.ETA" }),
            dataIndex: "eta",
            render: text => {
                return <ShowTime text={text} />;
            }
        },
        {
            title: formatMessage({ id: "list.table.head.Status" }),
            dataIndex: "status"
        }
    ];
    const handleTableChange = (
        { current: pageIndex, pageSize }: any,
        filters: any,
        { field = undefined, order = undefined }: any
    ) => {
        let sorts = {};
        if (field) {
            sorts = { [field]: order };
        }
        dispatch({
            type: "waybillList/save_searchCondition",
            payload: {
                searchCondition: {
                    waybillCondition,
                    sortConditions: sorts,
                    pagingCondition: {
                        pageIndex,
                        pageSize
                    }
                }
            }
        });
    };
    const handleRow = (record: any) => {
        return {
            onClick: () => {
                window.open(
                    `${window.location.origin}${window.location.pathname}#/App/waybillDetail/${record.id}`
                );
                // history.push(`/App/waybillDetail/${record.id}`);
            }
        };
    };

    useEffect(() => {
        dispatch({ type: "waybillList/fetch_waybillList" });
    }, []);
    return (
        <div className={styles.waybillList}>
            <SearchConditionForm />
            <div className={styles.waybillListTable}>
                <Table
                    columns={columns}
                    dataSource={waybills}
                    rowClassName={styles.rowClassName}
                    pagination={{
                        current: Number(currentPageIndex),
                        total: totalCount,
                        pageSizeOptions: ["10", "25", "50"],
                        showTotal: total => (
                            <div className="pagination-total">
                                {formatMessage({
                                    id: "list.table.pagination.total.desc"
                                })}
                                {total}
                            </div>
                        ),
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                    loading={effects["waybillList/fetch_waybillList"]}
                    onChange={handleTableChange}
                    // scroll={{ y: window.innerHeight - 330 }}
                    onRow={handleRow}
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default connect(({ waybillList, loading }: ConnectState) => ({
    waybillList,
    loading
}))(WaybillList);
