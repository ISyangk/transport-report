import React, { useEffect } from "react";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
import { FormComponentProps } from "antd/es/form";
import { connect } from "dva";
import {
    ConnectState,
    ConnectProps,
    waybillListModelState,
    globalModelState,
    dataDictionaryType
} from "@/models/connect";
import styles from "./SearchConditionForm.less";
import SearchSelectByKey from "./SearchSelectByKey";
import modeStatusMapping from "./modeStatusMapping.json";
import { CollapseContainer } from "@/components";
import { formatMessage } from "umi-plugin-react/locale";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface SearchConditionFormProps extends FormComponentProps, ConnectProps {
    waybillList: waybillListModelState;
    global: globalModelState;
}
const SearchConditionForm: React.FC<SearchConditionFormProps> = ({
    form,
    waybillList,
    dispatch,
    global
}) => {
    const { getFieldDecorator } = form;
    const { consignee, destination, mode, origin, shipper, status } = global;
    const {
        searchCondition: { sortConditions, pagingCondition, waybillCondition }
    } = waybillList;
    const handleSearchClick = () => {
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: "waybillList/save_searchCondition",
                    payload: {
                        searchCondition: {
                            waybillCondition: {
                                ...values
                            },
                            sortConditions,
                            pagingCondition: {
                                ...pagingCondition,
                                pageIndex: 1
                            }
                        }
                    }
                });
            }
        });
    };
    const handleClearClick = () => {
        form.resetFields();
        handleSearchClick();
    };
    const handleModeChange = () => {
        form.resetFields(["statusCode"]);
    };

    const getCurrentStatus = (status: dataDictionaryType) => {
        const mode = form.getFieldValue("modeCode");
        const modeJson = modeStatusMapping[mode] || null;
        if (modeJson === null) {
            return [];
        }
        if (modeJson && modeJson.length != 0 && status && status.length) {
            const byFilteringStatus = status.filter(({ code }) => {
                for (let i = 0; i < modeJson.length; i++) {
                    if (modeJson[i] === code) {
                        return false;
                    }
                }
                return true;
            });
            return byFilteringStatus;
        }
        return status;
    };

    const getOptions = (data: dataDictionaryType) => {
        if (data && data.length) {
            return data.map(({ code, description }) => (
                <Option key={code} value={code}>
                    {description}
                </Option>
            ));
        }
        return null;
    };
    useEffect(() => {
        form.setFieldsValue(waybillCondition);
        // dispatch({ type: "global/fetch_consignee" })
        // dispatch({ type: "global/fetch_transportationLocation", payload: "123" });
        // dispatch({ type: "global/fetch_mode" });
        // dispatch({ type: "global/fetch_origin" });
        // dispatch({ type: "global/fetch_shipper" })
        // dispatch({ type: "global/fetch_status" });
    }, []);

    return (
        <div className={styles.searchForm}>
            <CollapseContainer>
                <Form>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.PONO"
                                })}
                            >
                                {getFieldDecorator("purchaseOrderNo")(
                                    <Input allowClear />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.WaybillNO"
                                })}
                            >
                                {getFieldDecorator("wayBillNo")(
                                    <Input allowClear />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.shipper"
                                })}
                            >
                                {getFieldDecorator("shipper")(
                                    <Input allowClear />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Consignee"
                                })}
                            >
                                {getFieldDecorator("consignee")(
                                    <Input allowClear />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Origin"
                                })}
                            >
                                {getFieldDecorator("originCode")(
                                    <SearchSelectByKey />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Destination"
                                })}
                            >
                                {getFieldDecorator("destinationCode")(
                                    <SearchSelectByKey />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Start ETD To End ETD"
                                })}
                            >
                                {getFieldDecorator("etdFromTo")(
                                    <RangePicker />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Start ETA To End ETA"
                                })}
                            >
                                {getFieldDecorator("etaFromTo")(
                                    <RangePicker />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Mode"
                                })}
                            >
                                {getFieldDecorator("modeCode")(
                                    <Select
                                        onChange={handleModeChange}
                                        allowClear
                                        dropdownMatchSelectWidth={false}
                                    >
                                        {getOptions(mode)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={formatMessage({
                                    id: "search.condition.Status"
                                })}
                            >
                                {getFieldDecorator("statusCode")(
                                    <Select
                                        allowClear
                                        dropdownMatchSelectWidth={false}
                                    >
                                        {getOptions(getCurrentStatus(status))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </CollapseContainer>

            <div className={styles.btns}>
                <Button onClick={handleClearClick}>
                    {formatMessage({
                        id: "search.condition.Clear"
                    })}
                </Button>
                <Button onClick={handleSearchClick} type="primary">
                    {formatMessage({
                        id: "search.condition.Search"
                    })}
                </Button>
            </div>
        </div>
    );
};
export default connect(({ waybillList, global }: ConnectState) => ({
    waybillList,
    global
}))(Form.create<SearchConditionFormProps>()(SearchConditionForm));
