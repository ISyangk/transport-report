import React, {useState} from "react";
import { Icon, message } from "antd";
import styles from './style.less';
import downloadFn from '@/utils/download';

interface ShowFileModeType {
    resourceCode: string,
    name?: string,
}

const ShowFileMode: React.FC<ShowFileModeType> = ({ resourceCode, name }) => {
    const [ downStatus, setDownStatus ] =  useState(false);
    const handleDowload = ()=>{
        setDownStatus(true);
        downloadFn({
            url: '/waybill/detail/document',
            name: name,
            params: { resourceCode },
            // params: { resourceCode: 'fad44f1b86d0bb2e9f08a06dffb54ed9ae844906d8d73e390d4f7530ec02aa248a45303a443a8df022cdbf0663d7b985aa0969254c28578d99bcc6149366a2fd5efcf40c350e263a93cb8777fe120420fd3a25b98105684ba5bac8ba0acb0e61' },
            method: 'GET',
        }).then(() => {
            // const index = downArr.indexOf(record.id)
            // downArr.splice(index,1);
            setTimeout(() => {
                setDownStatus(false);
            }, 2000)
        }).catch(() => {
            setTimeout(() => {
                message.warn('Not exist!')
                setDownStatus(false);
            }, 1000)
            // const index = downArr.indexOf(record.id)
            // downArr.splice(index,1);
        });
    }
    if(resourceCode){
        if(downStatus){
            return (<Icon type="sync" spin />)
        }
        return (
            <div className={styles.optionImg} onClick={handleDowload}><img src={require('@/assets/icon/icon_7.png')}/></div>
        )
    }else{
        return (
            <div className={styles.noFile} >NO FILE</div>
        )
    }
    // return <React.Fragment>{text}</React.Fragment>;
};

export default ShowFileMode;
