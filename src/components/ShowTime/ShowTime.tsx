import React from "react";
import moment from "moment";
interface ShowTimeType {
    text: any,
    format?: string,
}

const ShowTime: React.FC<ShowTimeType> = ({ text, format = 'YYYY-MM-DD' }) => {
    const textN = text ? Number(text) : 0;
    if (!textN) {
        return null;
    }
    return <React.Fragment>{moment(textN).format(format)}</React.Fragment>;
};

export default ShowTime;
