import React from "react";
import { Modal, Button } from "antd";
import styles from "./modalInfo.less";
import { formatMessage } from "umi-plugin-react/locale";

export default (title: string) => {
    Modal.info({
        content: (
            <div className={styles.modalBody}>
                <div className={styles.modalIcon}></div>
                <div className={styles.content}>
                    <p>{title}</p>
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                Modal.destroyAll();
                            }}
                        >
                            {formatMessage({ id: "global.message.OK" })}
                        </Button>
                    </div>
                </div>
            </div>
        ),
        mask: false,
        icon: null,
        className: styles.modalStyle
    });
};
