import JScookies, { CookieAttributes } from "js-cookie";
import { JUSDA_TOKEN } from "@/utils/constant";

const cookieAttributes = (): CookieAttributes => {
    const hostname = window.location.hostname
    const domain = hostname.substring(hostname.indexOf("."))
    return { expires: 1, path: '/', domain }
}

class TokenCookie {
    options: CookieAttributes;
    constructor() {
        this.options = cookieAttributes()
    }
    get() {
        return JScookies.get(JUSDA_TOKEN)
    }
    set(value: string) {
        JScookies.set(JUSDA_TOKEN, value, this.options)
    }
    remove() {
        JScookies.remove(JUSDA_TOKEN, this.options)
    }
}

export default new TokenCookie()