import React, { useEffect } from 'react';
import styles from './style.less';
import { dataState } from '@/models/waybillDetail';
import { Tooltip } from 'antd';
import ShowTransportModeImg from "./ShowTransportModeImg";
import { ShowTime } from "@/components";


interface propsState {
    data?: dataState,
};

const styleObj:any = {
    'Normal': styles.Normal,
    'Attention': styles.Attention,
    'Delay': styles.Delay,
    'Pending': styles.Pending,
}

const MilestonesComp: React.FC<propsState> = (props) => {
    const { data }:any = props;
    const { milestones = [] } = data;

    // 当前的节点
    let nowRoute = '';
    const milestonesArr = milestones.map((item:any, index:any) => {
        // 获取当前的节点，如果是子节点则使用他的的父节点
        if(data.statusCode && data.statusCode === item.code && index < (milestones.length - 1)){
            nowRoute = item.parentCode ? item.parentCode : item.code;
        }
        // 查找有子节点的节点
        const childern = (item.parentCode === '') ? milestones.filter((it:any) => {
            return item.code === it.item.parentCode
        }) : []

        return {
            ...item,
            childern,
            // 如果实际时间大于 预期时间 就标红色
            isLate: ((item.est && item.act) && (item.act > item.est)) ? true : false,
        }
        // 最后只筛选出没有父节点的，即去除可能是子节点的数据
    }).filter((item:any) => {return !item.parentCode || item.parentCode === ''});
    if(!milestonesArr || milestonesArr.length === 0){
        return '';
    }
    return (
        <div className={styles.milestoneBox}>
            {milestonesArr.map((item:any, index:any) => {
                return (<div className={`${styles.mileItem} ${styleObj[item.emergency] ? styleObj[item.emergency] : ''}`} key={index}>
                    <div className={styles.mileName}>{item.name}</div>
                    <div className={styles.mileRound}>
                        <div></div>
                    </div>
                {item.est && (<div className={styles.mileTime}>Est: {item.est ? (<ShowTime text={item.est} format="YYYY-MM-DD HH:mm" />) : ''}</div>)}
                    {item.act && (<div className={`${styles.mileTime} ${item.isLate && styles.timeLate}`}>Act:{item.act ? (<ShowTime text={item.act} format="YYYY-MM-DD HH:mm" />) : ''}</div>)}
                    {nowRoute === item.code && (
                        <div className={styles.nowTraffic}>
                            <Tooltip title={data.status}>
                                <p>
                                    <ShowTransportModeImg text={data.modeCode}/>
                                </p>
                            </Tooltip>
                        </div>
                    )}
                </div>)
            })}
        </div>
    );
};

export default MilestonesComp;
// export default connect((waybillDetail) => ({
//     milestone: waybillDetail,
// }))(Milestones);
