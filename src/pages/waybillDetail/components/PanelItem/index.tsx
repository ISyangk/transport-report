import React, { useEffect } from 'react';
import styles from '../../style.less';
import { Avatar, Tooltip } from 'antd';

export interface optionType {
    position?: string,
    info?: {
        name?: string,
        contactsName?: string,
        contactNumber?: string,
        contactAddress?: string,
    };
}

const PanelItem: React.FC<optionType> = (props) => {
    const { info, position }:any = props;
    // if(!info){
    //     return null;
    // }
    return (
        <div className={styles.basicCol}>
            <div><Avatar size={80} style={{backgroundColor: '#fff' }} src={require('@/assets/img/user.png')} /></div>
            <div className={styles.basicBody}>
                <div className={styles.baLine1}>{position}</div>
                {info && info.name && (<div className={styles.baLine2}>{info.name}</div>)}
                <div className={styles.baLineSep}></div>
                {info && (info.contactNumber || info.contactsName) && (
                    <div className={styles.baLine3}>{`${info.contactsName} ${info.contactNumber}`}</div>
                )}
                {info && info.contactAddress ? (
                    <div className={styles.baLine4}>
                        <Tooltip title={info.contactAddress}>
                            <span>{info.contactAddress}</span>
                        </Tooltip>
                    </div>
                ) : ''}
            </div>
        </div>
    );
};

export default PanelItem;