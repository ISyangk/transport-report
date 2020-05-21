declare module '*.css';
declare module "*.png";
declare module "*.less";
declare module "*.svg";
declare module "*.json";

interface Window {
    jusdaBaseConfig: {
        baseUrl: string,
        apiUrl: string,
        cfgType: string,
    }
}