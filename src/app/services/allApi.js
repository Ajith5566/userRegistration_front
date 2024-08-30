import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"



//request to register a user
export default async function registerApi(reqBody) {
    return await commonApi('POST', `${BASE_URL}/user/register`, reqBody)
}