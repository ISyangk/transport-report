import React, { useState } from "react";
import { Select } from "antd";
import * as api from "@/service/global";

const { Option } = Select;
export interface optionType {
    code: string;
    description: string;
}

export interface optionsType {
    code: string;
    description: string;
}
[];

export interface SearchSelectByKeyType {
    onChange?: (value?: string) => void;
    value?: string;
}

const SearchSelectByKey = ({
    onChange = () => {},
    value = ""
}: SearchSelectByKeyType) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    let timer: NodeJS.Timeout | null = null;
    const handleSearch = (params: string) => {
        if (params) {
            if (params.trim().length >= 3) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(() => {
                    getTransportationLocationBySearchValue(params);
                }, 300);
            }
        } else {
            setOptions([]);
        }
    };

    const getTransportationLocationBySearchValue = (params: any) => {
        setLoading(true);
        api.getTransportationLocation({ name: params }).then(({ data }) => {
            setLoading(false);
            if (data && data.length) {
                setOptions(
                    data.map(({ code, description }: optionsType) => ({
                        code,
                        description: `${description} | ${code}`
                    }))
                );
            }
        });
    };

    const handleChange = (key: string) => {
        onChange(getOption(key).code);
    };

    const getOption = (keyOrValue: string): optionType => {
        if (options && options.length) {
            const option = options.filter(
                ({ code, description }) =>
                    keyOrValue === description || keyOrValue === code
            )[0];
            return option || { code: "", description: "" };
        }
        return { code: "", description: "" };
    };

    const getOptions = () => {
        if (options && options.length) {
            return options.map(({ code, description }) => (
                <Option key={code} value={description}>
                    {description}
                </Option>
            ));
        }
        return null;
    };

    return (
        <Select
            dropdownMatchSelectWidth={false}
            allowClear
            onChange={handleChange}
            value={getOption(value).description}
            showSearch
            onSearch={handleSearch}
            loading={loading}
        >
            {getOptions()}
        </Select>
    );
};

export default SearchSelectByKey;
