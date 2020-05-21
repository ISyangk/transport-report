import { useState, useEffect } from "react";
import request from "@/utils/request";
import TokenCookie from "@/utils/TokenCookie";
import gotoLogin from "./gotoLogin";
import { useHistory } from 'dva/router';

const useLoginUserAuth = (): boolean => {
    const [userAuth, setUserAuth] = useState(false)
    const { location: { pathname }, push } = useHistory()
    
    useEffect(() => {
        const verificationCode: string | null = new URLSearchParams(window.location.href).get(
            'verificationCode',
        );
        const jusda_token: string | undefined = TokenCookie.get()
        if (verificationCode) {
            request(`/authentication/getToken/${verificationCode}`, {
                prefix: undefined,
                method: 'GET',
            }).then(res => {
                if (res.data) {
                    TokenCookie.set(res.data)
                    push(pathname)
                    setUserAuth(true)
                }
            })
        } else if (jusda_token) {
            setUserAuth(true)
        } else {
            gotoLogin()
        }
    }, [])

    return userAuth
}

export default useLoginUserAuth