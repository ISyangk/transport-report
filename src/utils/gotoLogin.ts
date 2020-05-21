import { clientId } from "./constant";
const { authUrl } = window.jusdaBaseConfig

export default () => {
    window.location.href = authUrl
}
