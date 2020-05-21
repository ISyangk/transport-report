/* eslint-disable no-console */
import authTools from '@jusda-tools/auth-tools';
import { changeantdSkin } from '@/utils/utils';

const { AuthLogin } = authTools;

export const dva = {
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};

const {
    authUrl,
    clientId,
    getTokenUrl,
    getUserInfoUrl,
} = window.jusdaBaseConfig;


export async function render(oldRender) {
    // 统一认证鉴权
    await AuthLogin({
        authUrl,
        clientId,
        getTokenUrl,
        getUserInfoUrl,
    });

    const localTheme = localStorage.getItem('localTheme');
    if (localTheme) {
        changeantdSkin(localTheme);
    }
    oldRender();
}
