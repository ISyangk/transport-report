import React, { useState } from "react";
import { Icon } from "antd";
import styles from "./CollapseContainer.less";
import Classnames from "classnames";

interface CollapseContainerType {
    children: React.ReactNode;
}

const CollapseContainer = ({ children }: CollapseContainerType) => {
    
    const [showAll, setShowAll] = useState(false);

    const iconType = showAll === false ? "down" : "up";

    const contentCls = Classnames(styles.content, {
        [styles.showAllContent]: !showAll === false
    });

    const showAllBtnsCls = Classnames(styles.more, "ant-btn");

    return (
        <div className={styles.CollapseContainer}>
            <div className={contentCls}>{children}</div>
            <div
                className={showAllBtnsCls}
                onClick={() => setShowAll(!showAll)}
            >
                <Icon type={iconType} />
            </div>
        </div>
    );
};

export default CollapseContainer;
