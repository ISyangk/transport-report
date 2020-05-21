import React from "react";

interface ShowTransportModeType {
    text: string;
}

const ShowTransportMode: React.FC<ShowTransportModeType> = ({ text }) => {
    try {
        const src = require(`./img/${text}.png`);
        return <img src={src} alt="" width={50} height={50} />;
    } catch (error) {}
    if (!text) {
        return null;
    }
    return <React.Fragment>{text}</React.Fragment>;
};

export default ShowTransportMode;
