// ref: https://umijs.org/config/
import { IConfig } from "umi-types";
// import routes from "./src/routes";
const config: IConfig = {
    routes: [
        {
            path: "/",
            redirect: "/App/home"
        },
        {
            path: "/App",
            component: "../layouts/AppLayout",
            routes: [
                {
                    path: "/App/home",
                    component: "../pages/home"
                },
                {
                    path: "/App/403",
                    component: "../pages/403"
                },
                // {
                //     path: "/App/waybillDetail/:id",
                //     component: "../pages/waybillDetail"
                // },
                {
                    redirect: "/App/home"
                }
            ]
        },
        {
            redirect: "/App/home"
        }
    ],
    treeShaking: true,
    // ref: https://umijs.org/zh/config/#disableredirecthoist 解决路由重定向失效
    disableRedirectHoist: true,
    theme: {
        "primary-color": "#ffc500",
        "border-radius-base": "unset"
    },
    outputPath: "./build",
    history: "hash",
    hash: true,
    publicPath: "./",
    devtool: "none",
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            "umi-plugin-react",
            {
                antd: true,
                dva: true,
                dynamicImport: {
                    webpackChunkName: true
                },
                title: "jusda-temp",
                dll: true,
                locale: {
                    default: "en-US",
                    baseNavigator: false,
                    antd: true
                },
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//
                    ]
                }
            }
        ],
        [
            "umi-plugin-antd-theme",
            {
                theme: [
                    {
                        fileName: "jusdaGolden.css",
                        key: "jusdaGolden",
                        modifyVars: {
                            "@primary-color": "#ffc500", // 全局主色
                            "@link-color": "#EA9000", // 链接色
                            "@success-color": "#6FC677", // 成功色
                            // "@warning-color": "#faad14", // 警告色
                            "@error-color": "#FF6C6C", // 错误色
                            "@heading-color": "#222222", // 标题色
                            "@text-color": "#444444", // 主文本色
                            "@text-color-secondary": "#666666", // 次文本色
                            "@border-radius-base": "unset",
                        }
                    }
                ],
                // 是否压缩css
                min: true,
                // css module
                isModule: true,
                // 忽略 antd 的依赖
                ignoreAntd: false,
                // 忽略 pro-layout
                ignoreProLayout: false,
                // 不使用缓存
                cache: true
            }
        ]
    ],
    devServer: {
        proxy: {
            // '/api-gateway': {
            //     target: 'http://localhost:8001',
            //     // changeOrigin: true,
            //     pathRewrite: { '^/api-gateway': '' },
            // },
        }
    }
};

export default config;
