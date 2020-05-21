/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from "umi-request";
import { message, Modal } from "antd";
import authTools from '@jusda-tools/auth-tools';
import gotoLogin from "./gotoLogin";
import { clientId } from "./constant";
import { formatMessage } from "umi-plugin-react/locale";
import TokenCookie from "@/utils/TokenCookie";

const { apiUrl } = window.jusdaBaseConfig;
const { CookieTools } = authTools;

const cookieTools = new CookieTools();
/**
 * 配置request请求时的默认参数
 */
const request = extend({
    // errorHandler, // 默认错误处理
    // credentials: 'include', // 默认请求是否带上cookie
    prefix: "/waybill-query-app"
});

// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
    const { headers } = options;
    const temp: Record<string, any> = {}
    if (cookieTools.get('Jusda_token')) {
        temp.authorization = "Bearer " + cookieTools.get('Jusda_token');
    }
    // const Authorization ="Bearer " + cookieTools.get('Jusda_token');
    return {
        url: /http/.test(url) ? url : `${apiUrl}${url}`,
        // url: url,
        options: {
            ...options,
            headers: { ...headers, ...temp, clientId }
        }
    };
}, { global: false });


request.interceptors.response.use(async (response, options) => {
    try {
        const data = await response.clone().json();
        if (
            (data && data.errorCode && data.errorCode === "403") || (data && data.code && data.code === "40012") ||
            response.status === 403
        ) {
            Modal.error({
                title: formatMessage({ id: "login.timeout.desc" }),
                onOk: () => {
                    gotoLogin();
                }
            });
            // console.log(data);
            return Promise.reject(data);
        }

        if (!data.success && response.status === 200) {
            data && data.message && message.error(`${data.message}`);
            return Promise.reject(data);
        }

        if (!data.success) {
            const {
                status,
                message: msg
            }: { status: number; message: string } = data;
            msg
                ? message.error(`${msg}`)
                : status && message.error(`request error ${status}`);
            return Promise.reject(data);
        }
    } catch (error) { }
    return response;
}, { global: false });

export default request;
