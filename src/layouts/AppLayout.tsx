import React, { useEffect } from "react";
import UserContent from "./components/UserContent";
import ErrorBoundaries from "./components/ErrorBoundaries";
import styles from "./AppLayout.less";
import useLoginUserAuth from "@/utils/useLoginUserAuth";
import { ConnectState, ConnectProps, localeType } from "@/models/connect";
import { connect } from "dva";
// import { ConfigProvider } from "antd";
// import enUS from "antd/es/locale/en_US";
// import zhCN from "antd/es/locale/zh_CN";
import { VERSION } from "@/utils/constant";
// import { setLocale } from "umi-plugin-react/locale";
import BreadcrumbComp from "@/components/Breadcrumb/index";

// const configProviderLocaleMap = {
//     "en-US": enUS,
//     "zh-CN": zhCN
// };

interface AppLayoutProps extends ConnectProps {
    userInfo: any;
    locale: localeType;
}

const AppLayout: React.FC<AppLayoutProps> = ({
    children,
    userInfo,
    locale,
    location
}) => {
    // const authToken: boolean = useLoginUserAuth();

    // if (!authToken) {
    //     return null;
    // }

    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>
                <UserContent />
            </div>
            <div
                className={styles.appBody}
                style={
                    location?.pathname === "/App/home"
                        ? {
                              background:
                                  "linear-gradient(#FFFFFF, #C6C6C4)"
                          }
                        : undefined
                }
            >
                <div className={styles.appLayout}>
                    {/* <BreadcrumbComp notDisplayedPaths={["/App/home"]} /> */}
                    <ErrorBoundaries>{children}</ErrorBoundaries>
                </div>
            </div>
            <div className={styles.appFooter}>
                <div className={styles.appFooterCopyright}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002002220"
                    >
                        @2019 JUSDA 保留所有权利 V.{VERSION} 川公网安备
                        51019002002220号
                    </a>
                </div>
            </div>
        </div>
    );
};

export default connect(({ global: { userInfo, locale } }: ConnectState) => ({
    userInfo,
    locale
}))(AppLayout);
