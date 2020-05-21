
import { applicationList } from "@/models/global";
/**
 * 验证当前操作是否符合用户权限
 * return Boolen
 */
export function checkApplication(applicationList: applicationList, code: string) {
    // 判断是否包含传入的项目权限
    if (applicationList && applicationList.length) {
        return applicationList.some((item) => {
            return item.applicationCode === code;
        })
    }
    return false
}
