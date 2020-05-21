import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Avatar, Modal } from "antd";
import authTools from "@jusda-tools/auth-tools";
import logo from "@/assets/img/juslink_w.svg";
import styles from "./UserContent.less";
import gotoLogin from "@/utils/gotoLogin.ts";
import { useDispatch, useSelector } from "dva";
import { setLocale, formatMessage, getLocale } from "umi-plugin-react/locale";
import { ConnectState } from "@/models/connect";
import { useHistory } from "dva/router";
import TokenCookie from "@/utils/TokenCookie";
import UserControlPanel from "@jusda-tools/user-control-panel";
import LanguageControlPanel from "@jusda-tools/language-control-panel";

const languages = [
    {
        locale: "en-US",
        name: "English",
        flag: require("./en-US.png")
    },
    {
        locale: "zh-CN",
        name: "中文",
        flag: require("./zh-CN.png")
    }
];
const { CookieTools, JusdaUserInfo } = authTools;

const cookieTools = new CookieTools();
export default function UserContent() {
    const dispatch = useDispatch();

    const {
        location: { pathname },
        push
    } = useHistory();

    const locale = useSelector((state: ConnectState) => state.global.locale);

    const [username, setUsername] = useState(
        new JusdaUserInfo().getFullInfo().data.user.username
    );

    const handleDropdownClick = (locale: string) => {
        setLocale(locale, false);
        dispatch({ type: "global/save", payload: { locale } });
    };

    const handleLogoutClick = () => {
        new JusdaUserInfo().logout();
    };

    useEffect(() => {
        // dispatch({ type: "global/fetch_userInfo" });
        dispatch({ type: "global/fetch_applicationList" });
        // dispatch({ type: "global/save", payload: { locale } });
        handleDropdownClick(locale);
    }, []);

    return (
        <div className={styles.header}>
            <Link to="/App" className={styles.logo}>
                <img src={logo} alt="logo" title="首页" />
            </Link>
            <div className={styles.menus} />
            <div className={styles.rightMenus}>
                {/* <a
                    onClick={() => {
                        Modal.info({
                            title: formatMessage({
                                id: "global.message.not subscribed"
                            })
                        });
                    }}
                ></a> */}
                {pathname !== "/App/403" && (
                    <UserControlPanel
                        userIdentitySwitcher={{
                            enable: true,
                            requirePermission: false,
                            locale
                        }}
                        // visible
                    >
                        <div className="ant-dropdown-link">
                            <Avatar className="user-avtar" size={30}>
                                {username.substring(0, 1)}
                            </Avatar>
                            <div className="name">{username}</div>
                            <Icon type="caret-down" />
                        </div>
                    </UserControlPanel>
                )}
                <LanguageControlPanel locale={locale} onClick={handleDropdownClick}/>
            </div>
        </div>
    );
}
