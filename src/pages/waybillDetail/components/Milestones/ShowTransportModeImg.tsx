import React from "react";

interface ShowTransportModeImgType {
    text: string;
}

const ShowTransportModeImg: React.FC<ShowTransportModeImgType> = ({ text }) => {
    try {
        const src = require(`@/assets/communication/${text}.png`);
        return <img src={src} alt="" width={50} height={50} />;
    } catch (error) {}
    if (!text) {
        return null;
    }
    return <React.Fragment>{text}</React.Fragment>;
};

export default ShowTransportModeImg;
