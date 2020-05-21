import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WithRouter from "umi/withRouter";
import { Breadcrumb } from "antd";
import styles from "./style.less";
import { formatMessage } from "umi-plugin-react/locale";

const breadcrumbNameMap: any = {
    "/App": {
        name: () => formatMessage({ id: "breadcrumb.home" }),
        link: true
    },
    "/App/waybillList": {
        name: () => formatMessage({ id: "breadcrumb.waybillList" }),
        link: true
    },
    "/App/waybillDetail": {
        name: () => formatMessage({ id: "breadcrumb.waybillDetail" }),
        link: false
    }
};

const BreadcrumbComp = (props: any) => {
    // 对部分路由不显示面包屑
    const {
        location: { pathname },
        notDisplayedPaths=[]
    } = props;

    const notAllowedShowBeadcrumb = (notDisplayedPaths as string[]).some(
        item => {
            return item === pathname;
        }
    );

    if (notAllowedShowBeadcrumb) {
        return null;
    }

    const getPath = () => {
        const { location } = props;
        // 对路径进行切分
        const pathSnippets = location.pathname.split("/").filter((i: any) => i);

        // 将切分的路径读出来，形成面包屑
        return pathSnippets.map((_: any, index: number) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            console.log(url);
            if (breadcrumbNameMap[url]) {
                // if (breadcrumbNameMap[url] === 'Home') {
                //     return (
                //         <Breadcrumb.Item key={url}>
                //             {breadcrumbNameMap[url]}
                //         </Breadcrumb.Item>
                //     );
                // } else {
                return (
                    <Breadcrumb.Item key={url}>
                        {/* link为false 或者 是当前路由就不允许跳转 */}
                        {breadcrumbNameMap[url].link &&
                        location.pathname !== url ? (
                            <Link to={url}>
                                {breadcrumbNameMap[url].name()}
                            </Link>
                        ) : (
                            breadcrumbNameMap[url].name()
                        )}
                    </Breadcrumb.Item>
                );
                // }
            } else {
                return null;
            }
        });
    };
    return (
        <div className={styles.breadcrumbBox}>
            <Breadcrumb separator=">">{getPath()}</Breadcrumb>
        </div>
    );
};
export default WithRouter(BreadcrumbComp);
